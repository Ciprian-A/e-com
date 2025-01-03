'server only'

import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId} from '../env'

export const backendClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false, // Set to false if statically generating pages, using
	token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN
})
