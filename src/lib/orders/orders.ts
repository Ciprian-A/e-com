import {prisma} from '../../../config/db'

export const getUserOrders = async (userId: string) => {
	if (!userId) {
		throw new Error('User ID is required')
	}
	const orders = await prisma.order.findMany({
		where: {
			storeUserId: userId
		},
		include: {
			orderItems: {
				include: {
					item: {
						select: {
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
	console.log('getUserOrders ----->>>>>>', {orders})
	return orders
}

export const getAllOrders = async () => {
	const orders = await prisma.order.findMany({
		include: {
			orderItems: {
				include: {
					item: {
						select: {
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
export const getOrderById = async (id: string) => {
	const order = await prisma.order.findFirstOrThrow({
		where: {orderNumber: id},
		include: {
			orderItems: {
				include: {
					item: {
						select: {
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
	return order
}
