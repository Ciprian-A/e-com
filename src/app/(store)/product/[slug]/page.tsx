// import AddToBasketButton from '@/components/AddToBasketButton'
import ProductDetails from '@/components/ProductDetails'
import SizeSelector from '@/components/SizeSelector'
import {Separator} from '@/components/ui/separator'
import {imageUrl} from '@/lib/imageUrl'
import {getProductBySlug} from '@/sanity/lib/products/getProductBySlug'
import {PortableText} from 'next-sanity'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import React from 'react'
import {HeartIcon} from '@sanity/icons' //, HeartFilledIcon
import BuyItNow from '@/components/BuyItNow'

const prodDetails = {
	'Outer material': 'Leather',
	'Sole material': 'Rubber',
	'Inner material': 'Textile',
	'Closure type': 'Lace-up'
}
const detArr = Object.entries(prodDetails)

export const dynamic = 'force-static'
export const revalidate = 60 // revaliate at most every 60 seconds

const ProductPage = async ({params}: {params: Promise<{slug: string}>}) => {
	const {slug} = await params
	const product = await getProductBySlug(slug)

	console.log(
		`${crypto.randomUUID().slice(0, 5)} >>> Rendered the product page chache for ${slug}`
	)
	if (!product) {
		return notFound()
	}
	const isOutOfStock = !product?.stock || product?.stock <= 0

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div
					className={`relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? 'opacity-50' : ''}`}>
					{product.image && (
						<div>
							<Image
								src={imageUrl(product.image).url()}
								alt={product.name ?? ''}
								fill
								className='object-cover'
							/>
							<HeartIcon className='w-14 h-14 p-2 absolute top-2 right-2 bg-white shadow hover:shadow-lg rounded-full cursor-pointer' />
						</div>
					)}
					{isOutOfStock && (
						<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
							<span className='text-white font-bold text-lg'>Out of Stock</span>
						</div>
					)}
				</div>
				{/*Product details* */}
				<div className='flex flex-col w-full'>
					<div className=' flex flex-row space-x-8'>
						<div className='w-[50%]'>
							<h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
							<div className='text-3xl font-bold mb-4'>
								£{product.price?.toFixed(2)}
							</div>
							<Separator className='my-4' />
							<div>
								<p className='text-base mb-2'>
									Size<span className='text-red-500'>*</span>:
								</p>
								<SizeSelector />
							</div>
							<div className='mt-8 w-full'>
								<ProductDetails trigger='Product details:'>
									{detArr.map(dt => (
										<div
											key={dt[0]}
											className='flex w-full justify-between space-x-8 '>
											<p className='font-bold w-[50%]'>{dt[0]}</p>
											<p className='text-left w-[50%]'>{dt[1]}</p>
										</div>
									))}
								</ProductDetails>
							</div>
						</div>
						<div className='w-[50%]  flex flex-col space-y-2'>
							<BuyItNow />
						</div>
					</div>
					<div>
						<Separator className='my-4' />
						{/* <p className='text-lg font-bold'>About this item:</p> */}
						<div className='prose max-w-none mb-6'>
							{Array.isArray(product.description) && (
								<PortableText value={product.description} />
							)}
						</div>
						<Separator className='my-4' />
					</div>
					{/* <div className='mt-6'>
						<AddToBasketButton product={product} disabled={isOutOfStock} />
					</div> */}
				</div>
			</div>
		</div>
	)
}

export default ProductPage
