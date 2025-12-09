import { createPromoCode } from '@/lib/promoCodes'
import PromoCodeForm, { PromoCodeDataType } from './PromoCodeForm'

function NewPromoCodeForm() {
	async function onSubmit(data: PromoCodeDataType) {
    'use server'
    await createPromoCode(data)  
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
