import { defineQuery } from 'next-sanity'
import { PRODUCTS_BY_CATEGORY_QUERYResult } from '../../../../sanity.types'
import { sanityFetch } from '../live'

export const getProductsByCategory = async (categorySlug: string):Promise<PRODUCTS_BY_CATEGORY_QUERYResult> => {
	const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
    *[
      _type in ['clothing', 'footwear']
      && references(*[_type == 'category' && slug.current == $categorySlug]._id)
    ] | order(name asc)
    `)

	try {
		const products = await sanityFetch({
			query: PRODUCTS_BY_CATEGORY_QUERY,
			params: {
				categorySlug
			}
		})
		return products.data || []
	} catch (error) {
		console.error('Error fetching products by category:', error)
		return []
	}
}
