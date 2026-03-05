import OrderCard from '@/components/orders/OrderCard'
import {getUserOrders} from '@/lib/orders/orders'
import {auth} from '@clerk/nextjs/server'
import {redirect} from 'next/navigation'
import {ItemSize} from '../store/storeSlice'

async function Orders() {
	const {userId} = await auth()
	if (!userId) {
		return redirect('/')
	}
	const orders = await getUserOrders(userId)
	const serializedOrders = orders.map(order => ({
		...order,
		createdAt: order.createdAt.toISOString(),
		updatedAt: order.updatedAt.toISOString(),
		orderItems: order.orderItems.map(item => ({
			...item,
			size: item.size as ItemSize,
			item: {
				...item.item,
				stock: item.item.stock ?? 0,
				variants: item.item.variants.map(variant => ({
					...variant,
					createdAt: variant.createdAt.toISOString(),
					updatedAt: variant.updatedAt.toISOString()
				}))
			}
		}))
	}))
	return (
		<div className='flex flex-col items-center w-full min-h-screen bg-gray-50 p-4'>
			<div className='bg-white p-4 sm:p-8 reounded-xl shadow-lg w-full max-w-4xl'>
				<h1 className='text-4xl font-bold text-gray-900 tracking-tight mb-8'>
					Orders History
				</h1>
				{orders.length === 0 ? (
					<div className='text-center text-gray-600'>
						<p>You have not placed any orders yet.</p>
					</div>
				) : (
					<div className='space-y-4 sm:space-y-8'>
						{serializedOrders.map(order => (
							<OrderCard order={order} key={order.orderNumber} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Orders
