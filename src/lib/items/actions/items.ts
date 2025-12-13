'use server'

import { generateSlug } from '@/lib/generateSlug'
import { uploadCoverImage, uploadGalleryImages } from '@/lib/storage/storage'
import { revalidatePath } from 'next/cache'
import { prisma } from '../../../../config/db'

export async function createItem(formData: FormData) {
	const name = formData.get('name')?.toString() ?? ''
	const description = formData.get('description')?.toString() ?? ''
	const price = formData.get('price')?.toString() ?? '0'
	const productDetailsRaw = formData.get('product-details')?.toString() ?? '[]'
	let productDetails: {key: string; value: string}[] = []
	try {
		productDetails = JSON.parse(productDetailsRaw)
	} catch {
		productDetails = []
	}

	const categoriesRaw = formData.get('categories')?.toString() ?? '[]'
	let categories: string[] = []
	try {
		categories = JSON.parse(categoriesRaw)
	} catch {
		categories = []
	}
	const variantsRaw = formData.get('variants')?.toString() ?? '[]'
	let variants: {size: string; stock: number}[] = []
	try {
		variants = JSON.parse(variantsRaw)
	} catch {
		variants = []
	}

	const coverFile = formData.get('cover') as File
	const galleryFiles = formData.getAll('gallery') as File[]
	const slug = generateSlug(name)

	if (!coverFile) return {error: 'Cover image required'}

	// Call the extracted storage functions
	const imageUrl = await uploadCoverImage(coverFile)
	const galleryUrls = await uploadGalleryImages(galleryFiles)

	// Save to database
	const item = await prisma.item.create({
		data: {
			name,
			slug,
			description,
			imageUrl,
			imageGallery: galleryUrls,
			price: Number(price),
			productDetails,
			categories: {
				connect: categories.map(id => ({id}))
			},
			variants: {
				create: variants.map(v => ({
					size: v.size,
					stock: v.stock
				}))
			}
		}
	})

	return {success: true, item}
}

export async function updateItem(id: string, formData: FormData) {
	const name = formData.get('name')?.toString() ?? ''
	const description = formData.get('description')?.toString() ?? ''
	const price = formData.get('price')?.toString() ?? '0'

	const productDetailsRaw = formData.get('product-details')?.toString() ?? '[]'
	let productDetails: {key: string; value: string}[] = []
	try {
		productDetails = JSON.parse(productDetailsRaw)
	} catch {
		productDetails = []
	}

	const categoriesRaw = formData.get('categories')?.toString() ?? '[]'
	let categories: string[] = []
	try {
		categories = JSON.parse(categoriesRaw)
	} catch {
		categories = []
	}

	const variantsRaw = formData.get('variants')?.toString() ?? '[]'
	let variants: {size: string; stock: number}[] = []
	try {
		variants = JSON.parse(variantsRaw)
	} catch {
		variants = []
	}

	const coverFile = formData.get('cover') as File | null
	const galleryFiles = formData.getAll('gallery') as File[]

	// Upload new images if provided
	let imageUrl: string | undefined
	if (coverFile) {
		imageUrl = await uploadCoverImage(coverFile)
	}

	let galleryUrls: string[] | undefined
	if (galleryFiles && galleryFiles.length > 0) {
		galleryUrls = await uploadGalleryImages(galleryFiles)
	}

	const slug = generateSlug(name)

	// Update in database
	const item = await prisma.item.update({
		where: {id},
		data: {
			name,
			slug,
			description,
			...(imageUrl ? {imageUrl} : {}), 
			...(galleryUrls ? {imageGallery: galleryUrls} : {}),
			price: Number(price),
			productDetails,
			categories: {
				set: categories.map(id => ({id})) 
			},
			variants: {
				deleteMany: {}, 
				create: variants.map(v => ({
					size: v.size,
					stock: v.stock
				}))
			}
		}
	})

	return {success: true, item}
}

export const deleteItem = async(id:string)=> {
  try {
    await prisma.item.delete({where:{id}})
    revalidatePath('/admin/items')
  } catch (error) {
    console.log('Error deleting item:', error)
		throw new Error('Failed to delete item.')
  }
}
