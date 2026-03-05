'use server'

import {normalizeStripeCurrency} from '@/lib/constants/currency'
import stripe from '@/lib/stripe'
import {revalidatePath} from 'next/cache'
import Stripe from 'stripe'
import {prisma} from '../../../../config/db'

export async function createOrder(session: Stripe.Checkout.Session) {
	const {
		id: checkoutSessionId,
		amount_total,
		currency,
		customer,
		payment_intent,
		metadata,
		total_details
	} = session

	if (!metadata?.storeUserId) {
		throw new Error('Missing storeUserId in Stripe metadata')
	}
	const order = await prisma.order.upsert({
		where: {stripeCheckoutSessionId: checkoutSessionId},
		update: {}, // do nothing if order exists
		create: {
			stripeCheckoutSessionId: checkoutSessionId,
			stripePaymentIntentId: payment_intent as string,
			stripeCustomerID: customer as string,
			storeUserId: metadata.storeUserId,
			customerName: metadata.customerName ?? '',
			customerEmail: metadata.customerEmail ?? '',
			totalPrice: (amount_total ?? 0) / 100,
			amountDiscounted: total_details?.amount_discount
				? total_details.amount_discount / 100
				: 0,
			currency: normalizeStripeCurrency(currency!),
			orderStatus: 'PAID',
			promoCodeId: metadata.promoCodeId ?? null,
			emailSent: false // track email status
		}
	})
	if (order.emailSent) {
		return order
	}

	const lineItems = await stripe.checkout.sessions.listLineItems(
		checkoutSessionId,
		{
			expand: ['data.price.product']
		}
	)
	return prisma.$transaction(async tx => {
		for (const item of lineItems.data) {
			const product = item.price?.product as Stripe.Product
			const price = item.price as Stripe.Price

			const itemId = product.metadata.itemId
			const size = product.metadata.size || null
			const quantity = item.quantity ?? 1

			if (!itemId) {
				throw new Error('Stripe product missing itemId metadata')
			}
			// Fetch item with variants

			const dbItem = await tx.item.findUnique({
				where: {id: itemId},
				include: {variants: true}
			})
			if (!dbItem) {
				throw new Error(`Item not found: ${itemId}`)
			}
			// SIMPLE PRODUCT
			if (dbItem.type === 'SIMPLE') {
				if (dbItem.stock === null || dbItem.stock < quantity) {
					throw new Error(`Insufficient stock for simple item: ${dbItem.name}`)
				}

				// Deduct stock from Item
				await tx.item.update({
					where: {id: itemId},
					data: {
						stock: dbItem.stock - quantity
					}
				})

				// Create order item
				await tx.orderItem.create({
					data: {
						orderId: order.orderNumber,
						itemId,
						quantity,
						size: null,
						unitPrice: (price.unit_amount ?? 0) / 100
					}
				})

				continue
			}
			// VARIANT PRODUCT
			if (dbItem.type === 'VARIANT') {
				if (!size) {
					throw new Error(`Variant item missing size: ${dbItem.name}`)
				}

				const variant = dbItem.variants.find(v => v.size === size)
				if (!variant) {
					throw new Error(`Variant not found: ${dbItem.name} (size: ${size})`)
				}

				if (variant.stock < quantity) {
					throw new Error(
						`Insufficient stock for ${dbItem.name} (size: ${size})`
					)
				}

				// Deduct stock from Variant
				await tx.variant.update({
					where: {id: variant.id},
					data: {
						stock: variant.stock - quantity
					}
				})

				// Create order item
				await tx.orderItem.create({
					data: {
						orderId: order.orderNumber,
						itemId,
						quantity,
						size,
						unitPrice: (price.unit_amount ?? 0) / 100
					}
				})

				continue
			}
			throw new Error(`Unknown product type for item ${dbItem.id}`)
		}

		// Mark emailSent = true
		await prisma.order.update({
			where: {orderNumber: order.orderNumber},
			data: {emailSent: true}
		})

		return order
	})
}

export const deleteOrderById = async (id: string) => {
	try {
		await prisma.order.delete({
			where: {
				orderNumber: id
			}
		})
		revalidatePath('/admin/orders')
	} catch (error) {
		console.log('Error deleting order:', error)
		throw new Error('Failed to delete order.')
	}
}
