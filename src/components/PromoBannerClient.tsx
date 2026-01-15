'use client'

import { Check, Copy, Percent } from 'lucide-react'
import { useState } from 'react'

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
		<div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 mx-4 my-8'>
			<div className='relative bg-white/10 backdrop-blur-lg rounded-xl p-8 md:p-12'>
				<div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32'></div>
				<div className='absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24'></div>

				<div className='relative z-10 max-w-4xl mx-auto text-center'>
					<div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6'>
						<Percent className='w-4 h-4 text-white' />
						<span className='text-white text-sm font-medium'>
							Limited Time Offer
						</span>
					</div>

					<h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4'>
						{title}
					</h2>
					<p className='text-white/90 text-base sm:text-lg mb-8'>
						{description}
					</p>

					<div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
						<div className='bg-white rounded-xl px-6 py-4 flex items-center gap-3'>
							<code className='text-xl sm:text-2xl font-bold text-gray-900'>
								{couponCode}
							</code>
						</div>
						<button
							onClick={copyCode}
							className='bg-white hover:bg-gray-100 text-gray-900 rounded-xl px-6 py-4 font-medium transition flex items-center gap-2 w-full sm:w-auto justify-center'>
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
						</button>
					</div>

					<p className='text-white/70 text-sm mt-4'>
						Save {discountAmount}% on your entire order
					</p>
				</div>
			</div>
		</div>
	)
}

export default PromoBannerClient
