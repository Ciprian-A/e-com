'use client'

import {deletePromoCode} from '@/lib/promoCodes/actions/promoCodes'
import {useRouter} from 'next/navigation'
import {GenericTable} from '../GenericTable'
import {TableActions} from '../TableActions'

interface PromoCode {
	id: string
	title: string
	couponCode: string
	description?: string
	discountAmount: number
	isActive: boolean
	startDate: Date
	endDate: Date
	createdAt: Date
	updatedAt: Date
}

export function PromoCodesTable({promoCodes}: {promoCodes: PromoCode[]}) {
	const router = useRouter()
	const handleDelete = async (id: string) => {
		await deletePromoCode(id)
	}
	const columns = [
		{
			header: 'Title',
			accessor: (row: PromoCode) => row.title
		},
		{
			header: 'Description',
			accessor: (row: PromoCode) =>
				row.description?.trim() ? row.description : 'No description provided.'
		},
		{
			header: 'Coupon Code',
			accessor: (row: PromoCode) => row.couponCode
		},
		{
			header: 'Discount (%)',
			accessor: (row: PromoCode) => row.discountAmount
		},
		{
			header: 'Status',
			accessor: (row: PromoCode) => (row.isActive ? 'Active' : 'Inactive')
		}
	]

	const actions = (row: PromoCode) => (
		<TableActions
			dialogTitle='Delete Promo Code'
			dialogDescription='This action cannot be undone. Are you sure you want to delete this promo code?'
			onEdit={() => router.push(`/admin/promoCodes/${row.id}/edit`)}
			onDelete={() => handleDelete(row.id)}
		/>
	)

	return (
		<GenericTable
			columns={columns}
			data={promoCodes}
			actions={actions}
			tableCaption='Your recent promotional codes.'
			rowKey={row => row.id}
		/>
	)
}
