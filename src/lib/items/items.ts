import { prisma } from '../../../config/db'

export const getItems = async () => {
	const data = await prisma.item.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			categories: true,
			variants: true
		}
	})
	return data
}

export const getItem = async (id: string) => {
	const data = await prisma.item.findUniqueOrThrow({
		where: {
			id
		},
		include: {
			categories: true,
			variants: true
		}
	})
	return data
}
