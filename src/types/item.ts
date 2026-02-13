import {Currency, OrderStatus} from '../../generated/prisma/enums'

export type ItemDTO = {
	id: string
	name: string
	slug: string
	description?: string | null
	price: number
	productDetails: {key: string; value: string}[]
	imageUrl: string
	imageGallery: string[]
	categories?: CategoryDTO[]
	variants?: VariantDTO[]
	favourites?: FavoriteDTO[]
	createdAt: string
	updatedAt: string
}
export type VariantDTO = {
	id: string
	size: string
	stock: number
}
export type CategoryDTO = {
	id: string
	name: string
	slug: string
	description?: string | null
}
export type FavoriteDTO = {
	id: string
	itemId: string
	userId: string
	createdAt: string
}
export type OrderItemDTO = {
	id: string
	itemId: string
	quantity: number
	unitPrice: number
	item: ItemDTO | null
}
export type OrderDTO = {
	orderNumber: string
	stripeCheckoutSessionId: string
	stripeCustomerID: string
	customerName: string
	customerEmail: string
	stripePaymentIntentId: string
	promoCode?: PromoCodeDTO | null
	totalPrice: number
	currency: Currency
	amountDiscounted: number
	orderStatus: OrderStatus
	createdAt: string
	updatedAt: string
	orderItems: OrderItemDTO[]
}
export type PromoCodeDTO = {
	id: string
	title: string
	description?: string | null
	discountAmount: number
	cuponCode: string
	isActive: boolean
	startDate: string
	endDate: string
}
