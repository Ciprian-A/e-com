import {StateCreator} from 'zustand'
import {Clothing, Footwear} from '../../../../sanity.types'
type ItemType = (Footwear | Clothing) & {size: string}
type ProductType = Omit<ItemType, 'size'>
type ItemsType = {
	items: ItemType[]
	backendProducts: ProductType[]
}

type ItemActions = {
	setItems: (item: Footwear | Clothing) => void
	setBackendProducts: (products: (Footwear | Clothing)[]) => void
}

export type ItemSlice = ItemsType & ItemActions

export const createItemSlice: StateCreator<
	ItemSlice,
	[],
	[],
	ItemSlice
> = set => ({
	items: [],
	backendProducts: [],
	setItems: product =>
		set(() => {
			const items =
				product.sizesAndStock?.map(item => ({
					...product,
					_id: `${product._id}-${item.size}`,
					size: item.size ?? ''
				})) ?? []
			return {items: [...(items ?? [])]}
		}),
	setBackendProducts: products =>
		set(() => ({backendProducts: [...(products ?? [])]}))
})
