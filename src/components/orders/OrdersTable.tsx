'use client'

import {deleteCategory} from '@/lib/categories/actions/categories'
import {OrderDTO} from '@/types/item'
import {useRouter} from 'next/navigation'
import {GenericTable} from '../GenericTable'
import {TableActions} from '../TableActions'

interface Category {
	id: string
	name: string
	description?: string
	createdAt: Date
	updatedAt: Date
}
type Order = Pick<
	OrderDTO,
	'orderNumber' | 'totalPrice' | 'currency' | 'amountDiscounted' | 'orderStatus'
>

export function OrdersTable({orders}: {orders: Order[]}) {
	const router = useRouter()
	const handleDelete = async (id: string) => {
		await deleteCategory(id)
	}
	const columns = [
		{
			header: 'Order Number',
			accessor: (row: Order) => row.orderNumber
		},
		{
			header: 'Total Amount',
			accessor: (row: Order) => row.totalPrice
		},
		{
			header: 'Currency',
			accessor: (row: Order) => row.currency
		},
		{
			header: 'Amount Discounted',
			accessor: (row: Order) => row.amountDiscounted
		},
		{
			header: 'Status',
			accessor: (row: Order) => row.orderStatus
		}
	]

	const actions = (row: Order) => (
		<TableActions
			dialogTitle='Delete Order'
			dialogDescription='This action cannot be undone. Are you sure you want to delete this order?'
			onEdit={() => router.push(`/admin/orders/${row.orderNumber}/edit`)}
			onDelete={() => handleDelete(row.orderNumber)}
		/>
	)

	return (
		<GenericTable
			columns={columns}
			data={orders}
			actions={actions}
			tableCaption='Recent orders.'
			rowKey={row => row.orderNumber}
		/>
	)
}
