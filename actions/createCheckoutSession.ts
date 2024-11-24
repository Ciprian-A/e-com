'use server'

import {BasketItem} from '@/app/(store)/store'

export type Metadata = {
	orderNumber: string
	customerName: string
	customerEmail: string
	clerkUserId: string
}

export type GroupedBasketItem = {
	product: BasketItem['product']
	quantity: number
}

export const createCheckoutSession = async (
	items: GroupedBasketItem[],
	metadata: Metadata
) => {
	try {
		const itemsWithoutPrice = items.filter(item => !item.product.price)
		if (itemsWithoutPrice.length > 0) {
			throw new Error('Some items do not have a price')
		}
	} catch (error) {
		console.error('Error crating checkout session:', error)
		return ''
	}
}
