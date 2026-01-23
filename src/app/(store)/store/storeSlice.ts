import {ItemDTO} from '@/types/item'
import {StateCreator} from 'zustand'

export type StoreItem = ItemDTO & {
	size: ItemSize
	quantity: number
	favourite?: boolean
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
	| ''
type StoreActions = {
	setStoreItems: (items: ItemDTO[]) => void
	getStoreItems: () => StoreItem[]
	updateFavouriteItem: (itemId: string) => void
	setSelectedSize: (id: string, size: ItemSize) => void
	getSelectedSize: (id: string) => ItemSize
	setSelectedQuantity: (id: string, qty: number) => void
	getSelectedQuantity: (id: string) => number
	addItemToBasket: (item: StoreItem, size: ItemSize, qty: number) => void
	removeItem: (itemId: string) => void
	incrementItemCount: (itemId: string) => void
	decrementItemCount: (itemId: string) => void
	getItemCount: (itemId: string) => number
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
	setStoreItems: (items: ItemDTO[]) =>
		set(() => ({
			storeItems: items.map(item => ({
				...item,
				size: '',
				quantity: 0,
				favourite: false
			}))
		})),
	getStoreItems: () => get().storeItems,
	setSelectedSize: (id, size) => {
		set(state => ({
			storeItems: state.storeItems.map(item =>
				item.id === id ? {...item, size} : item
			)
		}))
	},
	getSelectedSize: (id: string) => {
		const foundItem = get().storeItems.find(item => item.id === id)
		const size = foundItem && foundItem.size ? foundItem.size : ''
		return size
	},
	setSelectedQuantity: (id, qty) => {
		set(state => ({
			...state,
			storeItems: state.storeItems.map(item =>
				item.id === id ? {...item, quantity: qty} : item
			)
		}))
	},
	getSelectedQuantity: (id: string) => {
		const foundItem = get().storeItems.find(item => item.id === id)
		const quantity = foundItem && foundItem.quantity ? foundItem.quantity : 1
		return quantity
	},
	getItemFromStore: (itemId: string) =>
		get().storeItems.find(p => p.id === itemId),
	updateFavouriteItem: itemId =>
		set(state => ({
			storeItems: state.storeItems.map(p =>
				p.id === itemId ? {...p, favourite: !p.favourite} : p
			)
		})),
	addItemToBasket: (item, size, qty) =>
		set(state => {
			const compositeId = `${item.id}-${size}`
			const existing = state.basketItems.find(i => i.id === compositeId)

			if (existing) {
				return {
					basketItems: state.basketItems.map(i =>
						i.id === compositeId ? {...i, quantity: i.quantity + qty} : i
					)
				}
			}

			const newItem: StoreItem = {
				...item,
				id: compositeId,
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
				basketItems: state.basketItems.filter(item => item.id != productId)
			}
		}),
	incrementItemCount: productId =>
		set(state => {
			return {
				basketItems: state.basketItems.map(item =>
					item.id === productId
						? {...item, quantity: item.quantity + 1}
						: {...item}
				)
			}
		}),
	decrementItemCount: productId =>
		set(state => {
			return {
				basketItems: state.basketItems.map(item =>
					item.id === productId
						? {...item, quantity: item.quantity - 1}
						: {...item}
				)
			}
		}),
	getItemCount: productId => {
		const foundItem = get().basketItems.find(item => item.id === productId)
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
