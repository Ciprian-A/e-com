import SizeSelector from '@/components/SizeSelector'
import {Separator} from '@/components/ui/separator'
import {getProductBySlug} from '@/sanity/lib/products/getProductBySlug'
import {PortableText} from 'next-sanity'
import {notFound} from 'next/navigation'
import React from 'react'
import BuyItNow from '@/components/BuyItNow'
import AddToBasket1 from '@/components/AddToBasket1'
import AddToFavouritesButton from '@/components/AddToFavouritesButton'
import ImageCarousel from '@/components/ImageCarousel'
import QuantitySelector from '@/components/QuantitySelector'

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
	const isOutOfStock = !product?.sizesAndStock?.some(p => (p?.stock ?? 0) > 0)

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div
					className={` aspect-[4/3] overflow-hidden rounded-lg  ${isOutOfStock ? 'opacity-50' : ''}`}>
					{product.image && <ImageCarousel product={product} />}
					{isOutOfStock && (
						<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
							<span className='text-white font-bold text-lg'>Out of Stock</span>
						</div>
					)}
				</div>
				<div className='flex flex-col w-full'>
					<div className=' flex flex-row space-x-8'>
						<div className='w-[65%]'>
							<h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
							<div className='text-3xl font-bold mb-4'>
								£{product.price?.toFixed(2)}
							</div>
							<Separator className='my-4' />
							<div>
								<p className='text-base mb-2'>
									Size<span className='text-red-500'>*</span>
								</p>
								<SizeSelector />
							</div>
							<div className='mt-8 w-full'>
								<p>Product details</p>
								{detArr.map(dt => (
									<div
										key={dt[0]}
										className='flex w-full justify-between space-x-8 '>
										<p className='font-bold w-[50%]'>{dt[0]}</p>
										<p className='text-left w-[50%]'>{dt[1]}</p>
									</div>
								))}
								{/* </ProductDetails> */}
							</div>
						</div>
						<div className='w-[35%] flex flex-col space-y-3 border rounded-md p-3'>
							<p>£ 11.99</p>
							<p className='text-green-600 text-xl font-semibold'>In stock</p>
							<QuantitySelector qty={10} />
							<BuyItNow />
							<AddToBasket1 />
							<AddToFavouritesButton />
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
