import { prisma } from '../../../config/db'

export const getPromoCodes = async () => {
	const data = await prisma.promoCode.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	})
	return data
}

export const getPromoCode = async (id: string) => {
	const data = await prisma.promoCode.findUniqueOrThrow({
		where: {
			id
		}
	})
	return data
}