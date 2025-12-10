import { updatePromoCode } from '@/lib/promoCodes/actions/promoCodes'
import { redirect } from 'next/navigation'
import PromoCodeForm, { PromoCodeDataType } from './PromoCodeForm'

function EditPromoCodeForm({
	promoCode
}: {
	promoCode: {
		id:string
		title: string
		description: string
		discountAmount: number
		cuponCode: string
		isActive: boolean
		startDate: Date
		endDate: Date
	}
}) {
	
	async function onSubmit( data: PromoCodeDataType) {
		'use server'
		await updatePromoCode({ ...data, id: promoCode.id })
		redirect('/admin/promoCodes')
	}
	return (
		<div>
			<PromoCodeForm
				onSubmit={onSubmit}
				formTitle='Edit Promo Code'
				formDescription='Make changes to your promotional code details below.'
				initialTitle={promoCode.title}
				initialDescription={promoCode.description}
				initialCuponCode={promoCode.cuponCode}
				initialDiscountAmount={promoCode.discountAmount}
				initialIsActive={promoCode.isActive}
				initialStartDate={promoCode.startDate}
				initialEndDate={promoCode.endDate}
			/>
		</div>
	)
}

export default EditPromoCodeForm
