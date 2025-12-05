import PromoCodeForm from './PromoCodeForm'

function EditPromoCodeForm({
	promoCode
}: {
	promoCode: {
		name: string
		description: string
		discountAmount: number
		cuponCode: string
		isActive: boolean
		startDate: Date
		endDate: Date
	}
}) {
	return (
		<div>
			<PromoCodeForm
      formTitle='Edit Promo Code'
      formDescription='Make changes to your promotional code details below.'
				initialTitle={promoCode.name}
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
