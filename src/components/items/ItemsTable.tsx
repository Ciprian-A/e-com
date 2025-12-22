'use client'

import { deleteItem } from '@/lib/items/actions/items'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { GenericTable } from '../GenericTable'
import { TableActions } from '../TableActions'

export interface Item {
	id: string
	name: string
	description?: string 
	price: number
	productDetails:
		| {
				key: string
				value: string
		  }[]
	imageUrl: string
	imageGallery: string[]
	createdAt: Date
	updatedAt: Date
}

export function ItemsTable({items}: {items: Item[]}) {
	const router = useRouter()
	const handleDelete = async (id: string) => {
		await deleteItem(id)
    console.log('item deleted', id);
	}
	const columns = [
		{
			header: 'Item',
			accessor: (row: Item) => (
				<div className='flex items-center gap-2'>
					{row.imageUrl && (
						<Image
							src={row.imageUrl}
							alt={row.name}
							width={20}
							height={20}
							className='hidden sm:flex sm:w-10 sm:h-10 object-cover rounded'
						/>
					)}
					<span>{row.name}</span>
				</div>
			)
		},
		{
			header: 'Description',
			accessor: (row: Item) =>
				row.description?.trim() ? row.description : 'No description provided.'
		},
		{
			header: 'Price',
			accessor: (row: Item) => row.price
		}
	]

	const actions = (row: {id: string}) => (
		<TableActions
			dialogTitle='Delete Item'
			dialogDescription='This action cannot be undone. Are you sure you want to delete this item?'
			onEdit={() => router.push(`/admin/items/${row.id}/edit`)}
			onDelete={() => handleDelete(row.id)}
		/>
	)

	return (
		<GenericTable
			columns={columns}
			data={items}
			actions={actions}
			tableCaption='Your recent items.'
		/>
	)
}
