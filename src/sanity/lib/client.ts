import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'
import { backendClient } from './backendClient'

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
	stega: {
		studioUrl:
			process.env.NODE_ENV === 'production'
				? `${process.env.NEXT_PUBLIC_PROD_URL}/studio`
				: `https://${process.env.NEXT_PUBLIC_DEV_URL}/studio`
	}
})
export async function updateFavourites(_id: string, favourite: boolean) {
	const data = await backendClient.patch(_id).set({favourite}).commit()
	return data
}
