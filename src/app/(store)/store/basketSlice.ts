import {StateCreator} from 'zustand'
import {Clothing, Footwear} from '../../../../sanity.types'

type BasketItem = {
	product: Footwear | Clothing
	quantity: number
}
type BasketState = {
	items: BasketItem[]
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
	clearBasket: () => void
}

export type BasketSlice = BasketState & BasketActions

export const createSlice: StateCreator<BasketSlice, [], [], BasketSlice> = (
	set,
	get
) => ({
	items: [],
	activeSize: '',
	setActiveSize: size => {
		set(state => ({...state, activeSize: size}))
	},
	getActiveSize: () => get().activeSize,
	addItemToBasket: (product, size) =>
		set(state => {
			return {
				items: state.items.map(item =>
					item.product._id === `${product._id}-${size}`
						? {...item, quantity: item.quantity + 1}
						: {...item, quantity: 1}
				)
			}
		}),
	removeItem: productId =>
		set(state => {
			return {
				items: state.items.filter(item => item.product._id != productId)
			}
		}),
	incrementItemCount: productId =>
		set(state => {
			return {
				items: state.items.map(item =>
					item.product._id === productId
						? {...item, quantity: item.quantity + 1}
						: {...item}
				)
			}
		}),
	decrementItemCount: productId =>
		set(state => {
			return {
				items: state.items.map(item =>
					item.product._id === productId
						? {...item, quantity: item.quantity - 1}
						: {...item}
				)
			}
		}),
	getItemCount: productId => {
		const foundItem = get().items.find(item => item.product._id === productId)
		return foundItem ? (foundItem.quantity ?? 0) : 0
	},
	getTotalPrice: () => {
		return get().items.reduce(
			(total, item) => total + (item.product.price ?? 0) * (item.quantity ?? 0),
			0
		)
	},
	clearBasket: () => set({items: []})
})
