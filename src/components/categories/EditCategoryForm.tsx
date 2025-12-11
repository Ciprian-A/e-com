import { updateCategory } from '@/lib/categories/actions/categories'
import { redirect } from 'next/navigation'
import CategoryForm, { CategoryDataType } from './CategoriesForm'

function EditCategoryForm({
	category
}: {
	category: {
		id: string
		name: string
		description?: string 
	}
}) {
	async function onSubmit(data: CategoryDataType) {
		'use server'
		await updateCategory({...data, id: category.id})
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
