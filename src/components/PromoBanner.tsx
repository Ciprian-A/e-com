import {getCategories} from '@/lib/categories/categories'
import {getActivePromoCode} from '@/lib/promoCodes/promoCodes'
import PromoBannerClient from './PromoBannerClient'

const PromoBanner = async () => {
	const sale = await getActivePromoCode()
	if (!sale?.isActive) {
		return null
	}

	const categories = await getCategories()
	console.log({categories, sale})
	return (
		<PromoBannerClient
			title={sale.title}
			description={sale.description!}
			couponCode={sale.couponCode}
			discountAmount={sale.discountAmount}
		/>
	)
}

export default PromoBanner
