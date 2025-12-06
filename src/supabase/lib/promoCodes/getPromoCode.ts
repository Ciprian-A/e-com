import { prisma } from '../../../../config/db'

export const getPromoCode = async (id: string) => {
	const data = await prisma.sale.findUniqueOrThrow({
		where: {
			id
		}
	})
	return data
}