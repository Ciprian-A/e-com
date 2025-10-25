import { defineQuery } from 'next-sanity'
import { ALL_PRODUCTS_QUERYResult } from '../../../../sanity.types'
import { sanityFetch } from '../live'

export const getAllProducts = async ():Promise<ALL_PRODUCTS_QUERYResult> => {
	const ALL_PRODUCTS_QUERY = defineQuery(`
    *[
    _type in [ 'clothing', 'footwear']
    ] | order(name asc)
    `)

	try {
		//use sanityFetch to send the query
		const products = await sanityFetch({
			query: ALL_PRODUCTS_QUERY
		})
		//return the list of products, or an emoty array if none found
		return products.data || []
	} catch (error) {
		console.error('Error fetching all products:', error)
		return []
	}
}
