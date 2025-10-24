'use client'
import useStore from '@/app/(store)/store'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { Clothing, Footwear } from '../../sanity.types'
import { ClientOnly } from './ClientOnly'
import ProductThumb from './ProductThumb'

const ProductGrid = ({products}: {products: (Clothing | Footwear)[]}) => {
	const {setStoreItems, getStoreItems} = useStore()
	useEffect(() => {
		setStoreItems(products)
	}, [products, setStoreItems])
	const items = getStoreItems()
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
			<ClientOnly>
				{items.map((item) => (
					<AnimatePresence key={item._id}>
						<motion.div
							layout
							initial={{opacity: 1}}
							animate={{opacity: 1}}
							exit={{opacity: 0}}
							className='flex justify-center'>
							<ProductThumb key={item._id} product={item} />
						</motion.div>
					</AnimatePresence>
				))}
			</ClientOnly>
		</div>
	)
}
export default ProductGrid
