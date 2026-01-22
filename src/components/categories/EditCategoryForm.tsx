import {updateCategory} from '@/lib/categories/actions/categories'
import {redirect} from 'next/navigation'
import CategoryForm from './CategoriesForm'

function EditCategoryForm({
	category
}: {
	category: {
		id: string
		name: string
		description?: string
	}
}) {
	console.log({category})
	async function onSubmit(data: FormData) {
		'use server'
		await updateCategory(category.id, data)
		redirect('/admin/categories')
	}
	return (
		<div>
			<CategoryForm
				onSubmit={onSubmit}
				formTitle='Edit Promo Code'
				formDescription='Make changes to your promotional code details below.'
				initialName={category.name}
				initialDescription={category.description}
			/>
		</div>
	)
}

export default EditCategoryForm
