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
// import { updateFavourites } from '@/sanity/lib/client'
import { Heart } from 'lucide-react'

import { ItemDTO } from '@/types/item'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const ImageCarousel = ({product}: {product: ItemDTO}) => {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const {updateFavouriteItem} = useStore()
	const item = useStore(state => state.storeItems.find(i=>i.id === product.id))
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
		if (!item || !item.id) return
		updateFavouriteItem(item.id)
		// updateFavourites(item.id, !item.favourite)
	}

	return (
		<Carousel setApi={setApi} opts={{loop: true}}>
			<CarouselContent className='relative'>
				{item?.imageGallery?.map(image => (
					<CarouselItem
						key={image}
						className='flex w-full justify-center items-center'>
						<Image
							src={image}
							alt={item.name ?? ''}
							width={550}
							height={550}
							className='object-contain'
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<Heart
				className={` w-14 h-14 p-2 absolute top-2 right-4 bg-white shadow hover:shadow-lg rounded-full cursor-pointer focus:outline-none ${isFavourite ? 'text-red-500 fill-current' : ''}`}
				onClick={handleFavouriteToggle}
			/>
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
