import { defineQuery } from 'next-sanity'
import { PRODUCT_SEARCH_QUERYResult } from '../../../../sanity.types'
import { sanityFetch } from '../live'

export const searchProductsByName = async (searchParam: string):Promise<PRODUCT_SEARCH_QUERYResult> => {
	const PRODUCT_SEARCH_QUERY = defineQuery(`
    *[
      _type in [ 'clothing', 'footwear']
      && name match $searchParam
    ] | order(name asc)
    `)

	try {
		const products = await sanityFetch({
			query: PRODUCT_SEARCH_QUERY,
			params: {
				searchParam: `${searchParam}`
			}
		})
		return products.data || []
	} catch (error) {
		console.error('Error fetching products by name:', error)
		return []
	}
}
