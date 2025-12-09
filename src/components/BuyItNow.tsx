import useStore from '@/app/(store)/store'
import { SignInButton, useAuth, useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { Clothing, Footwear } from '../../sanity.types'
import {
	createCheckoutSession,
	Metadata
} from '../lib/checkoutSession/actions/createCheckoutSession'
import Loader from './Loader'
import { Button } from './ui/button'

interface BuyItNowProps {
	product: Footwear | Clothing
}

const BuyItNow = ({product}: BuyItNowProps) => {
	const [isClient, setIsClient] = useState(false)
	const [isLoading, setIsloading] = useState(false)
	const {
		addItemToBasket,
		getSelectedSize,
		setSelectedSize,
		getSelectedQuantity,
		setSelectedQuantity,
		getGroupedItems
	} = useStore()

	const items = useStore().storeItems
	const {isSignedIn} = useAuth()
	const {user} = useUser()

	const size = getSelectedSize(product._id)
	const selectedQty = getSelectedQuantity(product._id)
	useEffect(() => {
		setIsClient(true)
	}, [])

	if (!isClient) {
		return <Loader />
	}

	const handleBuyItNow = async () => {
		if (!isSignedIn) return
		setIsloading(true)
		const itemToBeAddedToBasket = items.find(
			i => i._id === `${product._id}`
		)

		try {
			const groupedItems = getGroupedItems().filter(item => item.quantity > 0)

			if (itemToBeAddedToBasket && size !==undefined ) {
				addItemToBasket(itemToBeAddedToBasket, size, selectedQty)
			}
			const metadata: Metadata = {
				orderNumber: crypto.randomUUID(),
				customerName: user?.fullName ?? 'Unknown',
				customerEmail: user?.emailAddresses[0].emailAddress ?? 'Unknown',
				clerkUserId: user!.id
			}
			const checkoutUrl = await createCheckoutSession(groupedItems, metadata)
			if (checkoutUrl) {
				window.location.href = checkoutUrl
				setSelectedSize(product._id, '')
				setSelectedQuantity(product._id, 1)
			}
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
