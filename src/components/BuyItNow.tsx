'use client'
import useStore from '@/store'

import {SignInButton, useAuth, useUser} from '@clerk/nextjs'
import {useState} from 'react'
import {
	createCheckoutSession,
	Metadata
} from '../lib/checkoutSession/actions/createCheckoutSession'
import {Button} from './ui/button'

interface BuyItNowProps {
	productId: string
	name: string
	slug: string
	price: number
	image: string
	variants: {size: string; stock: number}[]
	productType: 'SIMPLE' | 'VARIANT'
	availableStock: number
}

const BuyItNow = ({
	productId,
	name,
	slug,
	price,
	image,
	variants,
	productType,
	availableStock
}: BuyItNowProps) => {
	const [isLoading, setIsloading] = useState(false)
	const {isSignedIn} = useAuth()
	const {user} = useUser()
	const activeSize = useStore(state => state.getSelectedSize(productId))
	const quantity = useStore(state => state.getSelectedQuantity(productId))
	const addToBasket = useStore(state => state.addItemToBasket)
	const clearBasket = useStore(state => state.clearBasket)

	const isSimpleProductType = productType === 'SIMPLE'
	const selectedVariant = variants.find(v => v.size === activeSize)
	const isDisabled = isSimpleProductType
		? quantity < 1 || quantity > availableStock
		: !activeSize || quantity < 1 || quantity > availableStock

	console.log({isDisabled, selectedVariant, availableStock})
	const handleBuyItNow = async () => {
		if (!isSignedIn || isDisabled) return
		setIsloading(true)
		try {
			const basketItem = {
				uniqueKey: isSimpleProductType
					? `${productId}-simple`
					: `${productId}-${activeSize}`,
				productId,
				name,
				slug,
				price,
				size: isSimpleProductType ? null : activeSize,
				quantity,
				image
			}
			addToBasket(basketItem)

			const metadata: Metadata = {
				orderNumber: crypto.randomUUID(),
				customerName: user?.fullName ?? 'Unknown',
				customerEmail: user?.emailAddresses[0].emailAddress ?? 'Unknown',
				storeUserId: user!.id
			}
			const checkoutUrl = await createCheckoutSession([basketItem], metadata)
			if (checkoutUrl) {
				window.location.href = checkoutUrl
			}
			clearBasket()
		} catch (error) {
			console.error('Error creating checkout session:', error)
		} finally {
			setIsloading(false)
		}
	}
	return isSignedIn ? (
		<Button
			onClick={handleBuyItNow}
			className='w-full rounded-md bg-white text-black text-base border-black border-2 hover:bg-gray-100 py-5'>
			{isLoading ? 'Processing...' : 'Buy it now'}
		</Button>
	) : (
		<SignInButton mode='modal'>
			<button className='w-full rounded-md bg-white text-black text-base border-black border-2 hover:bg-gray-100 py-2'>
				Buy it now
			</button>
		</SignInButton>
	)
}

export default BuyItNow
