'use server'

import { StoreItem } from '@/app/(store)/store/storeSlice'
import { imageUrl } from '@/lib/imageUrl'
import stripe from '@/lib/stripe'

export type Metadata = {
	orderNumber: string
	customerName: string
	customerEmail: string
	clerkUserId: string
}

export const createCheckoutSession = async (
	items: StoreItem[],
	metadata: Metadata
) => {
	try {
		const itemsWithoutPrice = items.filter(item => !item.price)
		if (itemsWithoutPrice.length > 0) {
			throw new Error('Some items do not have a price')
		}
		const customers = await stripe.customers.list({
			email: metadata.customerEmail,
			limit: 1
		})

		let customerId: string | undefined
		if (customers.data.length > 0) {
			customerId = customers.data[0].id
		}
		const baseUrl =
			process.env.NODE_ENV === 'production'
				? `https://${process.env.VERCEL_URL}`
				: `${process.env.NEXT_PUBLIC_BASE_URL}`

		const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`
		const cancelUrl = `${baseUrl}/basket`

		const session = await stripe.checkout.sessions.create({
			customer: customerId,
			customer_creation: customerId ? undefined : 'always',
			customer_email: !customerId ? metadata.customerEmail : undefined,
			metadata,
			mode: 'payment',
			allow_promotion_codes: true,
			success_url: successUrl,
			cancel_url: cancelUrl,
			line_items: items.map(item => ({
				price_data: {
					currency: 'gbp',
					unit_amount: Math.round(item.price! * 100),
					product_data: {
						name: item.name || 'Unnamed Product',
						description: `Product ID: ${item._id}`,
						metadata: {
							id: item._id
						},
						images: item.image ? [imageUrl(item.image).url()] : undefined
					}
				},
				quantity: item.quantity
			}))
		})
		return session.url
	} catch (error) {
		console.error('Error creating checkout session:', error)
		return ''
	}
}
