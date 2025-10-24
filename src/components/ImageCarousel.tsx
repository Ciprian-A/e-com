'use client'

import useStore from '@/app/(store)/store'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi
} from '@/components/ui/carousel'
import { imageUrl } from '@/lib/imageUrl'
import { updateFavourites } from '@/sanity/lib/client'
import { HeartFilledIcon, HeartIcon } from '@sanity/icons'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Clothing, Footwear } from '../../sanity.types'

const ImageCarousel = ({product}: {product: Footwear | Clothing}) => {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const {updateFavouriteItem} = useStore()
	const item = useStore(state => state.storeItems.find(i=>i._id === product._id))
	const isFavourite = item?.favourite
	
	useEffect(() => {
		if (!api) {
			return
		}
		setCurrent(api.selectedScrollSnap())

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap())
		})
	}, [api])

	const handleFavouriteToggle = () => {
		if (!item || !item._id) return
		updateFavouriteItem(item._id)
		updateFavourites(item._id, !item.favourite)
	}

	return (
		<Carousel setApi={setApi} opts={{loop: true}}>
			<CarouselContent className='relative'>
				{item?.images?.map(image => (
					<CarouselItem
						key={image._key}
						className='flex w-full justify-center items-center'>
						<Image
							src={imageUrl(image).url()}
							alt={item.name ?? ''}
							width={550}
							height={550}
							className='object-contain'
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			{isFavourite ? (
				<HeartFilledIcon
					className='w-14 h-14 p-2 absolute top-2 right-2 bg-white shadow hover:shadow-lg rounded-full cursor-pointer focus:outline-none text-red-500'
					onClick={handleFavouriteToggle}
				/>
			) : (
				<HeartIcon
					className='w-14 h-14 p-2 absolute top-2 right-2 bg-white shadow hover:shadow-lg rounded-full cursor-pointer focus:outline-none'
					onClick={handleFavouriteToggle}
				/>
			)}
			<CarouselPrevious
				className='absolute top-1/2 left-4 w-8 h-8 md:w-14 md:h-14'
				onClick={() => api?.scrollTo(current - 1)}
			/>
			<CarouselNext
				className='absolute top-1/2 right-4 w-8 h-8 md:w-14 md:h-14'
				onClick={() => api?.scrollTo(current + 1)}
			/>
		</Carousel>
	)
}

export default ImageCarousel
