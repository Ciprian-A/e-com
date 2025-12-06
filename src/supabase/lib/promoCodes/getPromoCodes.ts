import { prisma } from '../../../../config/db'

export const getPromoCodes = async () => {
	const data = await prisma.sale.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	})
	return data
}