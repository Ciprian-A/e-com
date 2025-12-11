import { supabase } from '../supabaseClient'

// Upload a single image (cover image)
export async function uploadCoverImage(file: File) {
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET!
	const fileName = `cover-${Date.now()}-${file.name}`

	const {error} = await supabase.storage
		.from(bucket)
		.upload(fileName, file, {
			contentType: file.type
		})

	if (error) throw new Error(error.message)

	const {data} = supabase.storage.from(bucket).getPublicUrl(fileName)

	return data.publicUrl
}

// Upload multiple gallery images
export async function uploadGalleryImages(files: File[]) {
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET!
	const urls: string[] = []

	for (const file of files) {
		if (file.size === 0) continue

		const fileName = `gallery-${Date.now()}-${file.name}`

		const {error} = await supabase.storage
			.from(bucket)
			.upload(fileName, file, {
				contentType: file.type
			})

		if (error) {
			throw new Error(`Failed uploading ${file.name}: ${error.message}`)
		}

		const {data} = supabase.storage
			.from(bucket)
			.getPublicUrl(fileName)

		urls.push(data.publicUrl)
	}

	return urls
}

// Optional: delete an image
export async function deleteImage(path: string) {
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET!
	const {error} = await supabase.storage.from(bucket).remove([path])

	if (error) throw new Error(error.message)
}
