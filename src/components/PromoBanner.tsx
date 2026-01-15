import { getActivePromoCode } from '@/lib/promoCodes/promoCodes'
import PromoBannerClient from './PromoBannerClient'

const PromoBanner = async () => {
	const sale = await getActivePromoCode()
	if (!sale?.isActive) {
		return null
	}

	return (
		<PromoBannerClient
			title={sale.title}
			description={sale.description!}
			couponCode={sale.cuponCode}
			discountAmount={sale.discountAmount}
		/>
	)
}

export default PromoBanner
