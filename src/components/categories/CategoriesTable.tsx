'use client'

import { useRouter } from 'next/navigation'
import { GenericTable } from '../GenericTable'
import { TableActions } from '../TableActions'

interface Category {
	id: string
	name: string
	description?: string
	createdAt: Date
	updatedAt: Date
}

export function CategoriesTable({categories}: {categories: Category[]}) {
	const router = useRouter()
	const handleDelete = async (id: string) => {
		console.log('delete category with id:',id)
	}
	const columns = [
		{
			header: 'Name',
			accessor: (row: Category) => row.name
		},
		{
			header: 'Description',
			accessor: (row: Category) => row.description?.trim()?row.description: 'No description provided.'
		}
	]

	const actions = (row: {id: string}) => (
      <TableActions
        dialogTitle='Delete Category'
        dialogDescription='This action cannot be undone. Are you sure you want to delete this category?'
        onEdit={() => router.push(`/admin/categories/${row.id}/edit`)}
        onDelete={() => handleDelete(row.id)}
      />
    )

	return (
		<GenericTable
			columns={columns}
			data={categories}
			actions={actions}
			tableCaption='Your recent product categories.'
		/>
	)
}
