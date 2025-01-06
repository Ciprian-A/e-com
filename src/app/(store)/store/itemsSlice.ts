import {StateCreator} from 'zustand'
import {Clothing, Footwear} from '../../../../sanity.types'

type ItemType = {
	items: (Footwear | Clothing)[]
}

type ItemActions = {
	setItems: (item: Footwear | Clothing) => void
}

export type ItemSlice = ItemType & ItemActions

export const createItemSlice: StateCreator<
	ItemSlice,
	[],
	[],
	ItemSlice
> = set => ({
	items: [],
	setItems: product =>
		set(() => {
			const items =
				product.sizesAndStock?.map(item => ({
					...product,
					_id: `${product._id}-${item.size}`
				})) ?? []
			return {items: [...(items ?? [])]}
		})
})
