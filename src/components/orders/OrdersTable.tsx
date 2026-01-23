'use client'

import {deleteOrderById} from '@/lib/orders/actions/orders'
import {OrderDTO} from '@/types/item'
import {useRouter} from 'next/navigation'
import {DeleteModal} from '../DeleteModal'
import {GenericTable} from '../GenericTable'

type Order = Pick<
	OrderDTO,
	'orderNumber' | 'totalPrice' | 'currency' | 'amountDiscounted' | 'orderStatus'
>

export function OrdersTable({orders}: {orders: Order[]}) {
	const router = useRouter()
	const handleDelete = async (id: string) => {
		await deleteOrderById(id)
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
		<DeleteModal
			dialogTitle='Delete Order'
			dialogDescription='This action cannot be undone. Are you sure you want to delete this order?'
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
			onRowClick={row => router.push(`/admin/orders/${row.orderNumber}`)}
		/>
	)
}
