import { prisma } from '../../../config/db'

export const getCategries = async()=> {
  try {
    const categories = await prisma.category.findMany({orderBy: {
      createdAt: 'desc'
    }})
    return categories
  } catch (error) {
    console.log('Error getting categories: ', error)
    throw new Error('Failed to get categories.')
  }
}