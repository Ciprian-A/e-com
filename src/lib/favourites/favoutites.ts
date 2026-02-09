import {prisma} from '../../../config/db'

export const getFavouriteItemsByUser = async (userId: string) => {
	try {
		const favoritesItems = await prisma.item.findMany({
			where: {
				favourites: {
					some: {
						userId: userId
					}
				}
			}
		})
		return favoritesItems
	} catch (error) {
		console.log('Error getting favourite items:', error)
		throw new Error('Failed to get favourite items.')
	}
}
