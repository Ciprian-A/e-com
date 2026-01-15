import { getActiveSaleByCuponCode } from '@/sanity/lib/sales/getActiveSaleByCuponCode'

const PromoBanner = async () => {
	const sale = await getActiveSaleByCuponCode('PROMO25')
	if (!sale?.isActive) {
		return null
	}

	return (
		<div className='bg-linear-to-r from-[#115acf] via-purple-500 to-[#115acf] text-white ps-6 py-10 mx-4 rounded-lg shadow-lg'>
			<div className='container mx-auto flex items-center '>
				<div className='flex-1'>
					<h2 className='text-3xl sm:text-5xl font-extrabold text-center mb-4'>
						{sale.tilte}
					</h2>
					<p className=' text-center text-xl sm:text-3xl font-semibold mb-6'>
						{sale.description}
					</p>
					<div className='flex justify-center'>
						<div className='bg-white text-black py-4 px-6 rounded-full shadow-md'>
							<span className='font-bold text-base sm:text-xl'>Use code: </span>
							<span className='font-bold text-base sm:text-xl text-red-600'>
								{sale.couponCode}
							</span>
							<span className='ml-2 font-bold text-base sm:text-xl'>
								for {sale.discountAmount} % OFF
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PromoBanner
