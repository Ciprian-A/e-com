import {createClient} from 'next-sanity'
import {backendClient} from './backendClient'
import {apiVersion, dataset, projectId} from '../env'

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
	stega: {
		studioUrl:
			process.env.NODE_ENV === 'production'
				? `https://${process.env.VERCEL_URL}/studio`
				: `https://${process.env.NEXT_PUBLIC_BASE_URL}/studio`
	}
})
export async function updateFavourites(_id: string, favourite: boolean) {
	const data = await backendClient.patch(_id).set({favourite}).commit()
	return data
}
