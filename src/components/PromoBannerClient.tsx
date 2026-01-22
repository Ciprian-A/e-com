'use client'

import {Check, Copy, Percent} from 'lucide-react'
import {useState} from 'react'
import ImageCarousel from './ImageCarousel'
import {Button} from './ui/button'

interface PromoBannerClientProps {
	title: string
	description: string
	couponCode: string
	discountAmount: number
}

const PromoBannerClient = ({
	title,
	description,
	couponCode,
	discountAmount
}: PromoBannerClientProps) => {
	const [copied, setCopied] = useState(false)

	const copyCode = () => {
		navigator.clipboard.writeText(couponCode)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}
	return (
		<div className='relative overflow-hidden rounded-2xl  p-1 mb-10 bg-[#e9e8e2]'>
			<div className='relative bg-white/10 backdrop-blur-lg rounded-xl p-8 md:p-12'>
				<div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32'></div>
				<div className='absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24'></div>

				<div className='relative z-10 max-w-4xl mx-auto text-center'>
					<div className='inline-flex items-center gap-2 bg-gray-500 backdrop-blur-sm px-4 py-2 rounded-full mb-6'>
						<Percent className='w-4 h-4 text-white' />
						<span className='text-white text-sm font-medium'>
							Limited Time Offer
						</span>
					</div>
					<h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-[#191919] mb-4'>
						{title}
					</h2>
					<p className='text-[#191919] text-base sm:text-lg mb-8'>
						{description}
					</p>
					<div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
						<div className='bg-white  border-2 border-dashed border-gray-600  rounded-lg px-6 py-4 flex flex-col justify-center'>
							<p className='text-xs text-[#191919] font-medium mb-1'>
								PROMO CODE
							</p>
							<code className='text-lg sm:text-xl font-bold text-[#191919]'>
								{couponCode}
							</code>
						</div>
						<Button
							onClick={copyCode}
							variant='outline'
							className='text-white bg-gray-600 hover:bg-gray-100 py-10 rounded-lg  font-medium transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 border-2 border-white'>
							{copied ? (
								<>
									<Check className='w-5 h-5' />
									Copied!
								</>
							) : (
								<>
									<Copy className='w-5 h-5' />
									Copy Code
								</>
							)}
						</Button>
					</div>
					<p className='text-[#191919] text-sm mt-4'>
						Save {discountAmount}% on your entire order
					</p>
				</div>
			</div>
			<ImageCarousel gallery={[]} id={'id'} name={'name'} />
		</div>
	)
}

export default PromoBannerClient
