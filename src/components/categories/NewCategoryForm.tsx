import {createCategory} from '@/lib/categories/actions/categories'
import {redirect} from 'next/navigation'
import CategoryForm from './CategoriesForm'

function NewCategoryForm() {
	async function onSubmit(data: FormData) {
		'use server'
		await createCategory(data)
		redirect('/admin/categories')
	}
	return (
		<div>
			<CategoryForm
				onSubmit={onSubmit}
				formTitle='Create New Category'
				formDescription='Enter the details for your new category below.'
			/>
		</div>
	)
}

export default NewCategoryForm
