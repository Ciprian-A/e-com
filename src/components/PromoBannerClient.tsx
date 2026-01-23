'use client'

import {Check, Copy, Percent} from 'lucide-react'
import {useState} from 'react'
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
		<div className='relative overflow-hidden rounded-2xl  mb-10 bg-[url(/RedCover.png)] bg-no-repeat bg-cover bg-center'>
			<div className='relative rounded-xl p-6 md:p-8 bg-white/5 backdrop-blur-sm '>
				<div className='relative z-10 max-w-4xl mx-auto text-center'>
					<div className='inline-flex items-center gap-2  px-4 py-2 rounded-full mb-4'>
						<div className='bg-white rounded-full p-3 shadow-lg items-center justify-center flex'>
							<Percent className='w-6 h-6 text-[#b02321]' strokeWidth={3} />
						</div>
						<p className='text-3xl sm:text-4xl md:text-5xl font-bold text-white'>
							{title.toUpperCase()}
						</p>
					</div>
					<p className='text-white text-base sm:text-lg mb-8'>{description}</p>
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
					<p className='text-white text-sm mt-4'>
						Save {discountAmount}% on your entire order
					</p>
				</div>
			</div>
		</div>
	)
}

export default PromoBannerClient
