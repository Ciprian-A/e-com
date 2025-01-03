import 'server-only'

import {defineLive} from 'next-sanity'
import {client} from '@/sanity/lib/client'

//set viewer token
const token = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN
if (!token) {
	throw new Error('Missing NEXT_PUBLIC_SANITY_API_READ_TOKEN')
}
export const {sanityFetch, SanityLive} = defineLive({
	client,
	serverToken: token,
	browserToken: token,
	fetchOptions: {
		revalidate: 0
	}
})
