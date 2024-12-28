// import AddToBasketButton from '@/components/AddToBasketButton'
import SizeSelector from '@/components/SizeSelector'
import {Separator} from '@/components/ui/separator'
import {imageUrl} from '@/lib/imageUrl'
import {getProductBySlug} from '@/sanity/lib/products/getProductBySlug'
import {PortableText} from 'next-sanity'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import React from 'react'
const prodDetails = {
	'Care instructions': 'Hand Wash',
	'Sole material': 'Rubber',
	'Shaft height': 'Ankle',
	'Outer material': 'Linen'
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
						<Image
							src={imageUrl(product.image).url()}
							alt={product.name ?? ''}
							fill
							className='object-cover transition-transform duration-300 hover:scale-105'
						/>
					)}
					{isOutOfStock && (
						<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
							<span className='text-white font-bold text-lg'>Out of Stock</span>
						</div>
					)}
				</div>
				{/*Product details* */}
				<div className='flex flex-col justify-between w-full'>
					<div className='w-[50%]'>
						<h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
						<div className='text-3xl font-bold mb-4'>
							£{product.price?.toFixed(2)}
						</div>
						<Separator className='my-4' />
						<div>
							<p className='text-md mb-2'>
								Size<span className='text-red-500'>*</span>:
							</p>
							<SizeSelector />
						</div>
						<div className='flex flex-col space-y-2 mt-8 w-full'>
							<p className='text-lg font-bold'>Product details:</p>
							<ul>
								{detArr.map(dt => (
									<li key={dt[0]}>
										<div className='flex w-full justify-between space-x-8 '>
											<p className='font-bold w-[50%]'>{dt[0]}</p>
											<p className='text-left w-[50%]'>{dt[1]}</p>
										</div>
									</li>
								))}
							</ul>
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
