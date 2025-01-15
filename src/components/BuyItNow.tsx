import React, {useEffect, useState} from 'react'
import {SignInButton, useAuth, useUser} from '@clerk/nextjs'
import {Button} from './ui/button'
import useStore from '@/app/(store)/store'
// import {useRouter} from 'next/navigation'
import Loader from './Loader'
import {
	createCheckoutSession,
	Metadata
} from '../../actions/createCheckoutSession'
import {Clothing, Footwear} from '../../sanity.types'

interface BuyItNowProps {
	product: Footwear | Clothing
}

const BuyItNow = ({product}: BuyItNowProps) => {
	const [isClient, setIsClient] = useState(false)
	const [isLoading, setIsloading] = useState(false)
	const {
		addItemToBasket,
		getActiveSize,
		setActiveSize,
		getSelectedQuantity,
		setSelectedQuantity,
		getGroupedItems
	} = useStore()

	const items = useStore().items
	const {isSignedIn} = useAuth()
	const {user} = useUser()

	const size = getActiveSize()
	const selectedQty = getSelectedQuantity()
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
			i => i._id === `${product._id}-${size}`
		)
		if (itemToBeAddedToBasket) {
			addItemToBasket(itemToBeAddedToBasket, selectedQty)
		}

		setActiveSize('')
		setSelectedQuantity(1)
		try {
			const groupedItems = getGroupedItems().filter(item => item.quantity > 0)

			if (itemToBeAddedToBasket) {
				addItemToBasket(itemToBeAddedToBasket, selectedQty)
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
			className='w-full rounded-md bg-white text-black text-base border-black border-2 hover:bg-gray-100 hover:scale-[1.01] hover:shadow-[0px_10px_15px_-5px_rgba(0,0,0,0.3)] py-5'>
			{isLoading ? 'Processing...' : 'Buy it now'}
		</Button>
	) : (
		<SignInButton mode='modal'>
			<button className='w-full rounded-md bg-white text-black text-base border-black border-2 hover:bg-gray-100 hover:scale-[1.01] hover:shadow-[0px_10px_15px_-5px_rgba(0,0,0,0.3)] py-2'>
				Buy it now
			</button>
		</SignInButton>
	)
}

export default BuyItNow
