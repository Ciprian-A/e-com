import { prisma } from '../../../config/db'

export const getUserOrders = async (userId: string) => {
  if (!userId) {
    throw new Error('User ID is required')
  }
  const orders = await prisma.order.findMany({
    where: {
      storeUserId: userId
    },
    include:{
      orderItems: {
        include: {
          item: {
            select:{
              id: true,
              name: true,
              slug: true,
              imageUrl: true,
              price: true,
              variants: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return orders
}