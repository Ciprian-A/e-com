import { defineQuery } from 'next-sanity'
import { MY_ORDERS_QUERYResult } from '../../../../sanity.types'
import { sanityFetch } from '../live'

export async function getMyOrders(userId: string): Promise<MY_ORDERS_QUERYResult> {
	if (!userId) {
		throw new Error('User ID is required')
	}

	const MY_ORDERS_QUERY = defineQuery(`
			*[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
			...,
			products[]{
				...,
				product->
				}
			}
    `)

	try {
		const orders = await sanityFetch({
			query: MY_ORDERS_QUERY,
			params: {userId}
		})
		return orders.data || []
	} catch (error) {
		console.error('Error fetching orders:', error)
		throw new Error('Error fetching orders')
	}
}
