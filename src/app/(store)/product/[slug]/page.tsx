import BuyBox from '@/components/BuyBox'
import ImageCarousel from '@/components/ImageCarousel'
import SizeList from '@/components/SizeList'
import {Separator} from '@/components/ui/separator'
import {getItemBySlug} from '@/lib/items/items'
import {notFound} from 'next/navigation'

export const dynamic = 'force-static'
export const revalidate = 60 // revaliate at most every 60 seconds

const ProductPage = async ({params}: {params: Promise<{slug: string}>}) => {
	const {slug} = await params
	const product = await getItemBySlug(slug)
	const mappedProduct = {
		...product,
		createdAt: product.createdAt.toISOString(),
		updatedAt: product.updatedAt.toISOString()
	}
	const sizeList = product.variants.map(p => p.size)

	console.log(
		`${crypto.randomUUID().slice(0, 5)} >>> Rendered the product page chache for ${slug}`
	)
	if (!product) {
		return notFound()
	}
	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<div className='overflow-hidden '>
					{product.imageUrl && (
						<ImageCarousel
							sideNav
							gallery={product.imageGallery}
							id={product.id}
							name={`Image of ${product.name}`}
						/>
					)}
				</div>
				<div className='flex flex-col w-full'>
					<div className=' flex flex-col lg:flex-row space-x-8'>
						<div className='w-full lg:w-[65%]'>
							<h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
							<div className='text-3xl font-bold mb-4'>
								£{product.price?.toFixed(2)}
							</div>
							<Separator className='my-4 w-full' />
							<div>
								<SizeList sizes={sizeList} productId={product.id} />
							</div>
							<div className='mt-8 w-full'>
								<h3 className='text-xl font-bold'>Product details</h3>
								{product?.productDetails?.map(p => (
									<div key={p.key} className='flex w-full space-x-8'>
										<p className='font-bold w-[30%]'>{p.key}</p>
										<p className='text-left w-[50%]'>{p.value}</p>
									</div>
								))}
							</div>
						</div>
						<BuyBox product={mappedProduct} />
					</div>
					<Separator className='my-4' />
					<div className='prose mb-6'>
						<h3 className='text-xl font-bold'>About this item</h3>
						{product.description && product.description}
					</div>
					<Separator className='my-4' />
				</div>
			</div>
		</div>
	)
}

export default ProductPage
