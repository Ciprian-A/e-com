import { StateCreator } from 'zustand'
import { Clothing, Footwear } from '../../../../sanity.types'

export type StoreItem = (Footwear | Clothing) & {
	size: string
	quantity: number
}
type StoreState = {
	basketItems: StoreItem[]
	storeItems: StoreItem[]
}
export type ItemSize =
	| '5'
	| '5.5'
	| '6'
	| '6.5'
	| '7'
	| '7.5'
	| '8'
	| '8.5'
	| '9'
	| '9.5'
	| '10'
	| '10.5'
	| '11'
	| '11.5'
	| '12'
	| '12.5'
	| 'XS'
	| 'S'
	| 'M'
	| 'L'
	| 'XL'
	| '2XL'
	| '3XL'
	| 'S'
	| ''
type StoreActions = {
	setStoreItems: (items: (Clothing | Footwear)[]) => void
	getStoreItems: () => (Clothing | Footwear)[]
	updateFavouriteItem: (itemId: string) => void
	setSelectedSize: (id: string, size: string) => void
	getSelectedSize: (id: string) => string
	setSelectedQuantity: (id: string, qty: number) => void
	getSelectedQuantity: (id: string) => number
	addItemToBasket: (
		product: Footwear | Clothing,
		size: string,
		qty: number
	) => void
	removeItem: (productId: string) => void
	incrementItemCount: (productId: string) => void
	decrementItemCount: (productId: string) => void
	getItemCount: (productId: string) => number
	getTotalPrice: () => number
	getGroupedItems: () => StoreItem[]
	clearBasket: () => void
}

export type StoreSlice = StoreState & StoreActions

export const createStoreSlice: StateCreator<StoreSlice, [], [], StoreSlice> = (
	set,
	get
) => ({
	basketItems: [],
	storeItems: [],
	setStoreItems: products =>
		set(() => ({
			storeItems: [
				...(products ?? []).map(p => ({...p, size: '', quantity: 0}))
			]
		})),
	getStoreItems: () => get().storeItems,
	setSelectedSize: (id, size) => {
		// console.log('setSelectedSize->>>', {id, size})
		set(state => ({
			storeItems: state.storeItems.map(item =>
				item._id === id ? {...item, size} : item
			)
		}))
	},
	getSelectedSize: (id: string) => {
		const foundItem = get().storeItems.find(item => item._id === id)
		const size = foundItem && foundItem.size ? String(foundItem.size) : ''

		// console.log('getSelectedSize->>>', {foundItem, size})
		return size
	},
	setSelectedQuantity: (id, qty) => {
		set(state => ({
			...state,
			storeItems: state.storeItems.map(item =>
				item._id === id ? {...item, quantity: qty} : item
			)
		}))
	},
	getSelectedQuantity: (id: string) => {
		const foundItem = get().storeItems.find(item => item._id === id)

		const quantity = foundItem && foundItem.quantity ? foundItem.quantity : 1
		// console.log('getSelectedQuantity->>>', {foundItem, quantity})
		return quantity
	},
	getItemFromStore: (itemId: string) =>
		get().storeItems.find(p => p._id === itemId),
	updateFavouriteItem: itemId =>
		set(state => ({
			storeItems: state.storeItems.map(p =>
				p._id === itemId ? {...p, favourite: !p.favourite} : p
			)
		})),
	addItemToBasket: (item, size, qty) =>
		set(state => {
			const compositeId = `${item._id}-${size}`
			const existing = state.basketItems.find(i => i._id === compositeId)

			if (existing) {
				return {
					basketItems: state.basketItems.map(i =>
						i._id === compositeId ? {...i, quantity: i.quantity + qty} : i
					)
				}
			}

			const newItem: StoreItem = {
				...item,
				_id: compositeId,
				size,
				quantity: qty
			}

			return {
				basketItems: [...state.basketItems, newItem]
			}
		}),

	removeItem: productId =>
		set(state => {
			return {
				basketItems: state.basketItems.filter(item => item._id != productId)
			}
		}),
	incrementItemCount: productId =>
		set(state => {
			return {
				basketItems: state.basketItems.map(item =>
					item._id === productId
						? {...item, quantity: item.quantity + 1}
						: {...item}
				)
			}
		}),
	decrementItemCount: productId =>
		set(state => {
			return {
				basketItems: state.basketItems.map(item =>
					item._id === productId
						? {...item, quantity: item.quantity - 1}
						: {...item}
				)
			}
		}),
	getItemCount: productId => {
		const foundItem = get().basketItems.find(item => item._id === productId)
		return foundItem ? (foundItem.quantity ?? 0) : 0
	},
	getTotalPrice: () => {
		return get().basketItems.reduce(
			(total, item) => total + (item.price ?? 0) * (item.quantity ?? 0),
			0
		)
	},
	getGroupedItems: () => get().basketItems,
	clearBasket: () => set({basketItems: []})
})