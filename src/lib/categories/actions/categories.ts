'use server'

import {revalidatePath} from 'next/cache'

import {generateSlug} from '@/lib/generateSlug'
import {uploadSingleImage} from '@/lib/storage/storage'
import {prisma} from '../../../../config/db'

export const createCategory = async (formData: FormData) => {
	const name = formData.get('name')?.toString() ?? ''
	const description = formData.get('description')?.toString() ?? ''
	const categoryImage = formData.get('categoryImage') as File
	try {
		const existingcategory = await prisma.category.findFirst({
			where: {
				name
			}
		})
		if (existingcategory) {
			throw new Error('This category already exists.')
		}
		const slug = generateSlug(name)
		const imageUrl = await uploadSingleImage(categoryImage)
		const category = await prisma.category.create({
			data: {
				name,
				description,
				slug,
				categoryImageUrl: imageUrl
			}
		})
		revalidatePath('/admin/categories')

		return category
	} catch (error) {
		console.log('Error creating category:', error)
		throw new Error('Failed to create category.')
	}
}
export const updateCategory = async (id: string, formData: FormData) => {
	const name = formData.get('name')?.toString() ?? ''
	const description = formData.get('description')?.toString() ?? ''
	const categoryImage = formData.get('categoryImage') as File
	try {
		const slug = generateSlug(name)
		const imageUrl = await uploadSingleImage(categoryImage)
		const category = await prisma.category.update({
			where: {id},
			data: {name, description, slug, categoryImageUrl: imageUrl}
		})
		revalidatePath('/admin/categories')
		console.log({name, description, categoryImage, updatedCategory: category})
		return category
	} catch (error) {
		console.log('Error updating category:', error)
		throw new Error('Failed to update category.')
	}
}
export const deleteCategory = async (id: string) => {
	try {
		await prisma.category.delete({
			where: {id}
		})
		revalidatePath('/admin/categories')
	} catch (error) {
		console.log('Error deleting category:', error)
		throw new Error('Failed to delete category.')
	}
}
