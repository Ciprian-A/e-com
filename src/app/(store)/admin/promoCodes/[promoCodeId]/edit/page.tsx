import EditPromoCodeForm from '@/components/EditPromoCodeFrom'
import { getPromoCode } from '@/lib/promoCodes/promoCodes'

async function EditPromoCode({params}: {params: Promise<{promoCodeId: string}>}) {
	const {promoCodeId} = await params
	console.log({promoCodeId})
	// const promoCode = {
	// 	id: 'fc98174d-a40d-4a7e-b5de-d6ce195af5a5',
	// 	name: 'PROMO25',
	// 	description: 'Promo code that will apply 25% discount on the total price.',
	// 	discountAmount: 25,
	// 	cuponCode: 'PROMO25',
	// 	isActive: false,
	// 	startDate: new Date('2025-12-25T01:03:41.000Z'),
	// 	endDate: new Date('2025-12-31T23:04:05.000Z'),
	// }
	const promoCode = await getPromoCode(promoCodeId)
	return (
		<div>
			<EditPromoCodeForm promoCode={promoCode} />
		</div>
	)
}

export default EditPromoCode
