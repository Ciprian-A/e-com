'use client'

import {
	createCheckoutSession,
	Metadata
} from '@/lib/checkoutSession/actions/createCheckoutSession'
import {OrderItemDTO} from '@/types/item'
import {SignInButton, useAuth, useUser} from '@clerk/nextjs'
import {Loader2} from 'lucide-react'
import {useState} from 'react'
import {toast} from 'sonner' // or your specific toast library
import {Button} from '../ui/button'

interface BuyAgainProps {
	orderItems: OrderItemDTO[]
}

const BuyAgainButton = ({orderItems}: BuyAgainProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const {isSignedIn} = useAuth()
	const {user} = useUser()

	const handleBuyAgain = async () => {
		if (!isSignedIn || orderItems.length === 0) return
		setIsLoading(true)

		function hasValidProduct(
			item: OrderItemDTO
		): item is OrderItemDTO & {item: NonNullable<OrderItemDTO['item']>} {
			return !!item.item
		}

		try {
			const outOfStockItems = orderItems.filter(item => {
				const product = item.item
				if (!product) return true

				if (product.type === 'SIMPLE') {
					return (product.stock ?? 0) < item.quantity
				}

				if (product.type === 'VARIANT') {
					const variant = product.variants?.find(v => v.size === item.size)
					return !variant || variant.stock < item.quantity
				}

				return false
			})
			if (outOfStockItems.length > 0) {
				const names = outOfStockItems
					.map(i => `${i.item?.name}${i.size ? ` (${i.size})` : ''}`)
					.join(', ')

				toast.error('Stock Issue', {
					description: `The following items are unavailable: ${names}`,
					duration: 5000
				})

				setIsLoading(false)
				return
			}

			const checkoutItems = orderItems.filter(hasValidProduct).map(item => ({
				uniqueKey: item.size
					? `${item.itemId}-${item.size}`
					: `${item.itemId}-simple`,
				productId: item.itemId,
				name: item.item.name,
				slug: item.item.slug,
				price: item.item.price,
				size: item.size || null,
				quantity: item.quantity,
				image: item?.item?.imageUrl,
				metadata: {
					itemId: item.itemId,
					size: item.size || ''
				}
			}))

			const metadata: Metadata = {
				orderNumber: crypto.randomUUID(),
				customerName: user?.fullName ?? 'Unknown',
				customerEmail: user?.emailAddresses[0].emailAddress ?? 'Unknown',
				storeUserId: user!.id
			}
			toast.success('Redirecting to checkout...')
			const checkoutUrl = await createCheckoutSession(checkoutItems, metadata)

			if (checkoutUrl) {
				window.location.href = checkoutUrl
			}
		} catch (error) {
			toast.error('Checkout Error', {
				description: 'Something went wrong while creating your session.'
			})
			console.log('Error during re-order checkout:', error)
		} finally {
			setIsLoading(false)
		}
	}

	if (!isSignedIn) {
		return (
			<SignInButton mode='modal'>
				<Button variant='outline' className='flex-1'>
					Buy Again
				</Button>
			</SignInButton>
		)
	}

	return (
		<Button
			onClick={handleBuyAgain}
			disabled={isLoading}
			className='flex-1 bg-black text-white hover:bg-gray-800'>
			{isLoading ? (
				<Loader2 className='mr-2 h-4 w-4 animate-spin' />
			) : (
				'Buy Again'
			)}
		</Button>
	)
}

export default BuyAgainButton
