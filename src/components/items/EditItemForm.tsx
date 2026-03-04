import {updateItem} from '@/lib/items/actions/items'
import {redirect} from 'next/navigation'
import ItemForm from './ItemForm'

function EditItemForm({
	categories,
	item
}: {
	categories: {
		id: string
		name: string
	}[]
	item: {
		id: string
		name: string
		description?: string
		categories: {
			id: string
			name: string
		}[]
		price: number
		productDetails?: {key: string; value: string}[]
		imageUrl: string | null
		imageGallery: string[]
		variants?: {size: string; stock: number}[]
		type: 'SIMPLE' | 'VARIANT'
		stock?: number
	}
}) {
	async function onSubmit(data: FormData) {
		'use server'
		await updateItem(item.id, data)
		redirect('/admin/items')
	}
	return (
		<div>
			<ItemForm
				onSubmit={onSubmit}
				formTitle='Edit Item'
				formDescription='Make changes to your item below.'
				initialName={item.name}
				initialDescription={item.description}
				initialPrice={item.price}
				initialProductDetails={item.productDetails}
				initialImageUrl={item.imageUrl}
				initialImageGallery={item.imageGallery}
				initialCategories={item.categories}
				initialVariants={item.variants}
				categories={categories}
				initialType={item.type}
				initialStock={item.stock ?? 0}
			/>
		</div>
	)
}

export default EditItemForm
