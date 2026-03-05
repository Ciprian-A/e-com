import {Currency, OrderStatus} from '../../generated/prisma/enums'
export type ProductType = 'SIMPLE' | 'VARIANT'

export type ItemDTO = {
	id: string
	name: string
	slug: string
	description?: string | null
	price: number
	productDetails: {key: string; value: string}[]
	imageUrl: string
	imageGallery: string[]
	createdAt?: string
	updatedAt?: string
	type: ProductType
	stock?: number
	categories?: CategoryDTO[]
	variants?: VariantDTO[]
	favourites?: FavoriteDTO[]
}
export type VariantDTO = {
	id: string
	size: string
	stock: number
	itemId?: string
	createdAt?: string
	updatedAt?: string
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
	item: ItemPreviewDTO | null
	size: string | null
}
export type OrderDTO = {
	orderNumber: string
	stripeCheckoutSessionId: string
	stripeCustomerID: string
	storeUserId: string
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
	emailSent: boolean
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
// Define what a "Preview" version of an Item looks like
export type ItemPreviewDTO = Pick<
	ItemDTO,
	'id' | 'name' | 'slug' | 'price' | 'imageUrl'
> & {
	variants?: VariantDTO[]
}

// Update your OrderItemDTO to use the Preview version
// export type OrderItemDTO = {
//   id: string;
//   itemId: string;
//   quantity: number;
//   unitPrice: number;
//   item: ItemPreviewDTO | null; // <--- Use the smaller version here
//   size: string | null;
// };
