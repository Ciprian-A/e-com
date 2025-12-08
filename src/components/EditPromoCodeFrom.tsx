'use client'

import { toast } from 'sonner'
import PromoCodeForm, { PromoCodeDataType } from './PromoCodeForm'

function EditPromoCodeForm({
	promoCode
}: {
	promoCode: {
		title: string
		description: string
		discountAmount: number
		cuponCode: string
		isActive: boolean
		startDate: Date
		endDate: Date
	}
}) {
	async function onSubmit(data: PromoCodeDataType) {
		toast('You submitted the following values:', {
			description: (
				<pre className='bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4'>
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
			position: 'bottom-right',
			classNames: {
				content: 'flex flex-col gap-2'
			},
			style: {
				'--border-radius': 'calc(var(--radius)  + 4px)'
			} as React.CSSProperties
		})
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
