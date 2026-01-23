import EditPromoCodeForm from '@/components/promoCodes/EditPromoCodeForm'
import {getPromoCode} from '@/lib/promoCodes/promoCodes'

async function EditPromoCode({
	params
}: {
	params: Promise<{promoCodeId: string}>
}) {
	const {promoCodeId} = await params
	const promoCodeRaw = await getPromoCode(promoCodeId)
	const promoCode = {
		...promoCodeRaw,
		description: promoCodeRaw.description ?? undefined
	}
	return (
		<div>
			<EditPromoCodeForm promoCode={promoCode} />
		</div>
	)
}

export default EditPromoCode
