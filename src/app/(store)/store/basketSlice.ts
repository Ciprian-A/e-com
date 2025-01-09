import {StateCreator} from 'zustand'
import {Clothing, Footwear} from '../../../../sanity.types'

type BasketItem = {
	product: Footwear | Clothing
	quantity: number
}
type BasketState = {
	products: BasketItem[]
	activeSize: string
}

type BasketActions = {
	setActiveSize: (size: string) => void
	getActiveSize: () => string
	addItemToBasket: (product: Clothing | Footwear, size: string) => void
	removeItem: (productId: string) => void
	incrementItemCount: (productId: string) => void
	decrementItemCount: (productId: string) => void
	getItemCount: (productId: string) => number
	getTotalPrice: () => number
	getGroupedItems: () => BasketItem[]
	clearBasket: () => void
}

export type BasketSlice = BasketState & BasketActions

export const createBasketSlice: StateCreator<
	BasketSlice,
	[],
	[],
	BasketSlice
> = (set, get) => ({
	products: [],
	activeSize: '',
	setActiveSize: size => {
		set(state => ({...state, activeSize: size}))
	},
	getActiveSize: () => get().activeSize,
	addItemToBasket: (product, size) =>
		set(state => {
			return {
				products: state.products.map(item =>
					item.product._id === `${product._id}-${size}`
						? {...item, quantity: item.quantity + 1}
						: {...item, quantity: 1}
				)
			}
		}),
	removeItem: productId =>
		set(state => {
			return {
				products: state.products.filter(item => item.product._id != productId)
			}
		}),
	incrementItemCount: productId =>
		set(state => {
			return {
				products: state.products.map(item =>
					item.product._id === productId
						? {...item, quantity: item.quantity + 1}
						: {...item}
				)
			}
		}),
	decrementItemCount: productId =>
		set(state => {
			return {
				products: state.products.map(item =>
					item.product._id === productId
						? {...item, quantity: item.quantity - 1}
						: {...item}
				)
			}
		}),
	getItemCount: productId => {
		const foundItem = get().products.find(
			item => item.product._id === productId
		)
		return foundItem ? (foundItem.quantity ?? 0) : 0
	},
	getTotalPrice: () => {
		return get().products.reduce(
			(total, item) => total + (item.product.price ?? 0) * (item.quantity ?? 0),
			0
		)
	},
	getGroupedItems: () => get().products,
	clearBasket: () => set({products: []})
})
