import { updateItem } from '@/lib/items/actions/items'
import { redirect } from 'next/navigation'
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
		price?: 0
		productDetails?: {key: string; value: string}[]
		coverPhoto?: string
		imageGallery?: string[]
		variants?: {size: string; stock: number}[]
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
				formTitle='Edit Promo Code'
				formDescription='Make changes to your promotional code details below.'
				initialName={item.name}
				initialDescription={item.description}
				initialPrice={item.price}
				initialProductDetails={item.productDetails}
				initialCoverPhoto={item.coverPhoto}
				initialImageGallery={item.imageGallery}
				initialCategories={item.categories}
				initialVariants={item.variants}
				categories={categories}
			/>
		</div>
	)
}

export default EditItemForm
