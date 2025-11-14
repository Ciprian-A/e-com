import { BasketIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const orderType = defineType({
	name: 'order',
	title: 'Order',
	type: 'document',
	icon: BasketIcon,
	fields: [
		defineField({
			name: 'orderNumber',
			title: 'Order Number',
			type: 'string',
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'stripeCheckoutSessionId',
			title: 'Stripe Checkout Session ID',
			type: 'string',
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'stripeCustomerId',
			title: 'Stripe customer ID',
			type: 'string',
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'clerkUserId',
			title: 'Store User ID',
			type: 'string',
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'customerName',
			title: 'Customer Name',
			type: 'string',
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'email',
			title: 'Customer Email',
			type: 'string',
			validation: Rule => Rule.required().email()
		}),
		defineField({
			name: 'stripePaymentIntentId',
			title: 'Stripe Payment Intent ID',
			type: 'string',
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'products',
			title: 'Products Purchased',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({
							name: 'product',
							title: 'Product Bought',
							type: 'reference',
							to: [{type: 'footwear'}, {type: 'clothing'}]
						}),
						defineField({
							name: 'sizeAndQuantity',
							title: 'Size and Quantity Purchased',
							type: 'array',
							of: [
								defineArrayMember({
									type: 'object',
									fields: [
										defineField({
											name: 'size',
											title: 'Size',
											type: 'string'
										}),
										defineField({
											name: 'quantity',
											title: 'Quantity',
											type: 'number'
										})
									],
									preview:{
										select:{
											size: 'size',
											quantity: 'quantity'
										},
										prepare(selection) {
											return {
												title: `${selection.size} x ${selection.quantity}`
											}
										}
									}
								})
							]
						}),
						defineField({
							name: 'quantity',
							title: 'Quantity Purchased',
							type: 'number'
						})
					],
					preview: {
						select: {
							product: 'product.name',
							quantity: 'sizeAndQuantity',
							image: 'product.image',
							price: 'product.price',
							currency: 'product.currency'
						},
						prepare(select) {
							const quantity =
								select.quantity || []
									? select.quantity.reduce(
											(acc: number, item: {quantity: number}) =>
												acc + item.quantity,
											0
										)
									: 0
							return {
								title: `${select.product} x ${quantity}`,
								subtitle: `£${select.price} * ${quantity}`,
								media: select.image
							}
						}
					}
				})
			]
		}),
		defineField({
			name: 'quantity',
			title: 'Quantity',
			type: 'number'
		}),
		defineField({
			name: 'totalPrice',
			title: 'Total Price',
			type: 'number',
			validation: Rule => Rule.required().min(0)
		}),
		defineField({
			name: 'currency',
			title: 'Currency',
			type: 'string',
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'amountDiscount',
			title: 'Amount Discoount',
			type: 'number',
			validation: Rule => Rule.required().min(0)
		}),
		defineField({
			name: 'status',
			title: 'Order Status',
			type: 'string',
			options: {
				list: [
					{title: 'Pending', value: 'pending'},
					{title: 'Paid', value: 'paid'},
					{title: 'Shipped', value: 'shipped'},
					{title: 'Delivered', value: 'delivered'},
					{title: 'Cancelled', value: 'cancelled'}
				]
			}
		}),
		defineField({
			name: 'orderDate',
			title: 'Order Date',
			type: 'datetime',
			validation: Rule => Rule.required()
		})
	],
	preview: {
		select: {
			name: 'customerName',
			amount: 'totalPrice',
			currency: 'currency',
			orderId: 'orderNumber',
			email: 'email'
		},
		prepare(select) {
			const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`
			return {
				title: `${select.name} (${orderIdSnippet})`,
				subtitle: `${select.currency}${select.amount}, ${select.email}`,
				media: BasketIcon
			}
		}
	}
})
