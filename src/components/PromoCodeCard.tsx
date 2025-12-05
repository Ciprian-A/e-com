'use client'

import BackButton from './BackButton'

function PromoCodeCard({promoCode }: {promoCode: any}) {
  return (
		<div>
			<BackButton />
			{promoCode.name}

		</div>
	)
}

export default PromoCodeCard