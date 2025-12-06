'use server'

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
    return promoCode
  } catch (error) {
    console.log('Error creating promo code:', error)
    throw new Error('Failed to create promo code.')
    
  }
}
