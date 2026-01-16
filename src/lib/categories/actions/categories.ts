'use server'

import {revalidatePath} from 'next/cache'

import {generateSlug} from '@/lib/generateSlug'
import {prisma} from '../../../../config/db'

type CategoryData = {
	name: string
	description?: string
}

type UpdateCategoryData = CategoryData & {
	id: string
}
export const createCategory = async (categoryData: CategoryData) => {
	try {
		const existingcategory = await prisma.category.findFirst({
			where: {
				name: categoryData.name
			}
		})
		if (existingcategory) {
			throw new Error('This category already exists.')
		}
		const slug = generateSlug(categoryData.name)
		const category = await prisma.category.create({
			data: {...categoryData, slug}
		})
		revalidatePath('/admin/categories')

		return category
	} catch (error) {
		console.log('Error creating category:', error)
		throw new Error('Failed to create category.')
	}
}
export const updateCategory = async (categoryData: UpdateCategoryData) => {
	try {
		const slug = generateSlug(categoryData.name)
		const category = await prisma.category.update({
			where: {id: categoryData.id},
			data: {...categoryData, slug}
		})
		revalidatePath('/admin/categories')

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
