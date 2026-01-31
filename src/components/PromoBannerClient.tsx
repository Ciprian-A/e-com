'use client'

import {formatDate} from '@/lib/formatDate'

interface PromoBannerClientProps {
	title: string
	description: string
	couponCode: string
	discountAmount: number
	endDate: Date
}

const PromoBannerClient = ({
	title,
	description,
	couponCode,
	discountAmount,
	endDate
}: PromoBannerClientProps) => {
	return (
		<div className='relative overflow-hidden rounded-2xl  mb-10 bg-[url(/RedCover.png)] bg-no-repeat bg-cover bg-center'>
			<div className='relative rounded-xl p-6 md:p-8 bg-white/5 backdrop-blur-sm flex flex-col sm:flex-row justify-between lg:justify-around items-center gap-6 md:gap-8'>
				<div>
					<div className='relative z-10 max-w-4xl mx-auto text-start'>
						<div className='inline-flex items-center  py-2 rounded-full mb-4'>
							<p className='text-3xl sm:text-4xl md:text-5xl font-bold text-white text-start'>
								{title.toUpperCase()}
							</p>
						</div>
						<p className='text-white text-base sm:text-lg mb-8'>
							{description}
						</p>
						<div className=''>
							<div className='bg-white rounded-lg px-2 py-4 flex items-center w-full max-w-max sm:flex-row   text-start gap-2'>
								<p className='text-lg sm:text-xl  text-[#191919] font-medium text-start self-start mb-1'>
									USE CODE:
								</p>
								<p className='text-lg sm:text-xl font-bold text-start text-[#191919] self-start'>
									{couponCode}
								</p>
							</div>

							<span className='text-white text-xs'>
								Valid until:{' '}
								{formatDate(new Date(endDate), {dateStyle: 'long'})}
							</span>
						</div>
					</div>
				</div>
				<div className='hidden sm:flex rounded-full aspect-square p-8 bg-white max-w-max max-h-max  flex-col justify-center items-center outline-groove outline-4 outline-white outline-double text-8xl text-red-700 font-bold'>
					<span>{discountAmount}%</span>
					<span>OFF</span>
				</div>
			</div>
		</div>
	)
}

export default PromoBannerClient
