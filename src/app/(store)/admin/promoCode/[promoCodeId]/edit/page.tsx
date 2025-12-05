import PromoCodeCard from '@/components/PromoCodeCard'

async function PromoCode({params}: {params: Promise<{promoCodeId: string}>}) {
	const {promoCodeId} = await params
	const promoCode = {
		id: 'fc98174d-a40d-4a7e-b5de-d6ce195af5a5',
		name: 'PROMO25',
		description: 'Promo code that will apply 25% discount on the total price.',
		discountAmount: 25,
		cuponCode: 'PROMO25',
		isActive: false,
		startDate: '2025-12-25T01:03:41.000Z',
		endDate: '2025-12-31T23:04:05.000Z',
		createdAt: '2025-12-05T01:04:27.340Z',
		updatedAt: '2025-12-05T01:04:22.000Z'
	}
	console.log({promoCodeId})
	return (
		<div>
			<PromoCodeCard promoCode={promoCode} />
		</div>
	)
}

export default PromoCode
