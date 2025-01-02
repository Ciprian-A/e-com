import {defineQuery} from 'next-sanity'
import {sanityFetch} from '../live'

export const getAllFavouriteProducts = async () => {
	const ALL_FAVOURITE_PRODUCTS_QUERY = defineQuery(`
    *[
    _type in [ 'clothing', 'footwear'] && favourite == true
    ] | order(name asc)
    `)

	try {
		//use sanityFetch to send the query
		const products = await sanityFetch({
			query: ALL_FAVOURITE_PRODUCTS_QUERY
		})
		//return the list of all favourite products, or an empty array if none found
		return products.data || []
	} catch (error) {
		console.error('Error fetching all favourite products:', error)

		return []
	}
}
