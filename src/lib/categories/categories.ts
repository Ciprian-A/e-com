import { prisma } from '../../../config/db'

export const getCategories = async()=> {
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
export const getCategory = async(id:string)=> {
  try {
    const category = await prisma.category.findUniqueOrThrow({where: {id}})
    return category
  } catch (error) {
    console.log('Error getting category: ', error)
    throw new Error('Failed to get category.')
  }
}