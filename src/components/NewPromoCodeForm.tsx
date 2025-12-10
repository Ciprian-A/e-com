import { createPromoCode } from '@/lib/promoCodes/actions/promoCodes'
import { redirect } from 'next/navigation'
import PromoCodeForm, { PromoCodeDataType } from './PromoCodeForm'

function NewPromoCodeForm() {
	async function onSubmit(data: PromoCodeDataType) {
    'use server'
    await createPromoCode(data) 
    redirect('/admin/promoCodes') 
	}
	return (
		<div>
			<PromoCodeForm
				onSubmit={onSubmit}
				formTitle='Create Promo Code'
				formDescription='Enter the details for your new promotional code below.'
			/>
		</div>
	)
}

export default NewPromoCodeForm
