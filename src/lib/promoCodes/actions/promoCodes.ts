'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '../../../../config/db'

type PromoCodeData = {
	title: string
	cuponCode: string
	description: string
	discountAmount: number
	isActive: boolean
	startDate: Date
	endDate: Date
}

type UpdatePromoCodeData = PromoCodeData & {
	id: string
}
export const createPromoCode = async (promoCodeData: PromoCodeData) => {
	try {
		const existingPromoCode = await prisma.promoCode.findFirst({
			where: {
				cuponCode: promoCodeData.cuponCode
			}
		})
		if (existingPromoCode) {
			throw new Error('Promo code with this cupon code already exists.')
		}
		const promoCode = await prisma.promoCode.create({
			data: {...promoCodeData}
		})
		revalidatePath('/admin/promoCodes')

		return promoCode
	} catch (error) {
		console.log('Error creating promo code:', error)
		throw new Error('Failed to create promo code.')
	}
}
export const updatePromoCode = async (promoCodeData: UpdatePromoCodeData) => {
	try {
		const promoCode = await prisma.promoCode.update({
			where: {id: promoCodeData.id},
			data: {...promoCodeData}
		})
		revalidatePath('/admin/promoCodes')

		return promoCode
	} catch (error) {
		console.log('Error updating promo code:', error)
		throw new Error('Failed to update promo code.')
	}
}
export const deletePromoCode = async (id: string) => {
	try {
		await prisma.promoCode.delete({
			where: {id}
		})
		revalidatePath('/admin/promoCodes')
	} catch (error) {
		console.log('Error deleting promo code:', error)
		throw new Error('Failed to delete promo code.')
	}
}
