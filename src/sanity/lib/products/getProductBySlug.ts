import { defineQuery } from 'next-sanity'
import { PRODUCT_BY_ID_QUERYResult } from '../../../../sanity.types'
import { sanityFetch } from '../live'

export const getProductBySlug = async (
	slug: string
): Promise<PRODUCT_BY_ID_QUERYResult> => {
	const PRODUCT_BY_ID_QUERY = defineQuery(`
      *[
        _type in [ 'clothing', 'footwear']
        && slug.current == $slug   
      ] | order(name asc) [0]
    `)
	try {
		const product = await sanityFetch({
			query: PRODUCT_BY_ID_QUERY,
			params: {
				slug
			}
		})
		return product.data || null
	} catch (error) {
		console.error('Error fetching product by ID:', error)
		return null
	}
}
