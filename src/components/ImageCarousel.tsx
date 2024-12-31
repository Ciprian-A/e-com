'use client'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi
} from '@/components/ui/carousel'
import Image from 'next/image'
import {HeartIcon, HeartFilledIcon} from '@sanity/icons'
import {imageUrl} from '@/lib/imageUrl'
import {useEffect, useState} from 'react'
import {Footwear, Clothing} from '../../sanity.types'

const ImageCarousel = ({product}: {product: Footwear | Clothing}) => {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)

	useEffect(() => {
		if (!api) {
			return
		}
		setCurrent(api.selectedScrollSnap())

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap())
		})
	}, [api])

	return (
		<Carousel setApi={setApi} opts={{loop: true}}>
			<CarouselContent className='relative'>
				{product?.images?.map(image => (
					<CarouselItem
						key={image._key}
						className='flex w-full justify-center items-center'>
						<div className=''>
							<Image
								src={imageUrl(image).url()}
								alt={product.name ?? ''}
								width={550}
								height={550}
								className='object-contain '
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			{product.favourite ? (
				<HeartFilledIcon className='w-14 h-14 p-2 absolute top-2 right-2 bg-white shadow hover:shadow-lg rounded-full cursor-pointer focus:outline-none text-red-500' />
			) : (
				<HeartIcon className='w-14 h-14 p-2 absolute top-2 right-2 bg-white shadow hover:shadow-lg rounded-full cursor-pointer focus:outline-none' />
			)}
			<CarouselPrevious
				className='absolute top-1/2 left-4 w-14 h-14'
				onClick={() => api?.scrollTo(current - 1)}
			/>
			<CarouselNext
				className='absolute top-1/2 right-4 w-14 h-14'
				onClick={() => api?.scrollTo(current + 1)}
			/>
		</Carousel>
	)
}

export default ImageCarousel
