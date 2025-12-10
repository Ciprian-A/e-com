'use client'

import { deletePromoCode } from '@/lib/promoCodes/actions/promoCodes'
import { useRouter } from 'next/navigation'
import { GenericTable } from '../GenericTable'
import { PromoCodesActions } from './PromoCodesActions'

interface PromoCode {
	id: string
	title: string
	cuponCode: string
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
			accessor: (row: PromoCode) => row.title,
		},
		{header: 'Description', accessor: (row: PromoCode) => row.description},
		{header: 'Coupon Code', accessor: (row: PromoCode) => row.cuponCode},
		{header: 'Discount (%)', accessor: (row: PromoCode) => row.discountAmount},
		{
			header: 'Status',
			accessor: (row: PromoCode) => (row.isActive ? 'Active' : 'Inactive')
		}
	]

	const actions = (row: {id: string}) => (
		<PromoCodesActions
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
		/>
	)
}
