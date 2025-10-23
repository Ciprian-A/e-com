import BuyBox from '@/components/BuyBox'
import ImageCarousel from '@/components/ImageCarousel'
import SizeSelector from '@/components/SizeSelector'
import { Separator } from '@/components/ui/separator'
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import { PortableText } from 'next-sanity'
import { notFound } from 'next/navigation'

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
	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<div className='aspect-[4/3] overflow-hidden'>
					{product.image && <ImageCarousel product={product} />}
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
								<p className='text-base mb-2'>
									Size<span className='text-red-500'>*</span>
								</p>
								<SizeSelector product={product} />
							</div>
							<div className='mt-8 w-full'>
								<p>Product details</p>
								{product?.productDetails?.map(p => (
									<div key={p._key} className='flex w-full space-x-8'>
										<p className='font-bold w-[30%]'>{p.detail}</p>
										<p className='text-left w-[50%]'>{p.value}</p>
									</div>
								))}
							</div>
						</div>
						<BuyBox product={product} />
					</div>
					<Separator className='my-4' />
					<div className='prose mb-6'>
						{Array.isArray(product.description) && (
							<PortableText value={product.description} />
						)}
					</div>
					<Separator className='my-4' />
				</div>
			</div>
		</div>
	)
}

export default ProductPage
