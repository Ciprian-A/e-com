'use client'

import useStore from '@/app/(store)/store'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	CarouselSideNav,
	type CarouselApi
} from '@/components/ui/carousel'
import {toggleFavoriteItem} from '@/lib/items/actions/items'
import {useUser} from '@clerk/nextjs'
import {EmblaPluginType} from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import {Heart} from 'lucide-react'

import Image from 'next/image'
import {useEffect, useState} from 'react'

const ImageCarousel = ({
	gallery,
	id,
	name,
	sideNav = false,
	autoplay = false
}: {
	gallery: string[]
	sideNav?: boolean
	autoplay?: boolean
	id?: string
	name?: string
}) => {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const {updateFavouriteItem} = useStore()
	const item = useStore(state => state.storeItems.find(i => i.id === id))
	const {user} = useUser()
	const isFavourite = item?.favourite
	const autoplayPlugin = autoplay ? Autoplay({delay: 5000}) : undefined
	const fadePlugin = Fade()
	const plugins = [autoplayPlugin, fadePlugin].filter(
		Boolean
	) as EmblaPluginType[]

	useEffect(() => {
		if (!api) {
			return
		}
		setCurrent(api.selectedScrollSnap())

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap())
		})
	}, [api])

	const handleFavouriteToggle = async () => {
		if (!item?.id || !user) return

		updateFavouriteItem(item.id)

		try {
			await toggleFavoriteItem(user.id, item.id)
		} catch {
			updateFavouriteItem(item.id)
		}
	}
	console.log({item})
	return (
		<Carousel
			className='relative   bg-[#f7f7f7] rounded-lg'
			setApi={setApi}
			opts={{loop: true, active: true}}
			plugins={plugins}>
			<div className='flex flex-col gap-4 relative p-1 sm:p-4'>
				<div className='flex-1'>
					<CarouselContent className=''>
						{gallery?.map(image => (
							<CarouselItem key={image} className='  '>
								<Image
									src={image}
									alt={name ?? ''}
									width={500}
									height={500}
									className='w-full h-full object-cover md:max-h-[500px] rounded-lg '
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<Heart
						className={` w-8 h-8 md:w-14 md:h-14 p-2 absolute top-6 right-6 bg-white shadow hover:shadow-lg rounded-full cursor-pointer focus:outline-none ${isFavourite ? 'text-red-500 fill-current' : ''}`}
						onClick={handleFavouriteToggle}
						strokeWidth={1.5}
					/>
					<CarouselPrevious
						className='absolute top-1/2 left-6 w-8 h-8 md:w-14 md:h-14'
						onClick={() => api?.scrollTo(current - 1)}
					/>
					<CarouselNext
						className='absolute top-1/2 right-6 md:w-14 md:h-14'
						onClick={() => api?.scrollTo(current + 1)}
					/>
				</div>
				{sideNav && <CarouselSideNav images={gallery} />}
			</div>
		</Carousel>
	)
}

export default ImageCarousel
