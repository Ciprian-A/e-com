import {OrdersTable} from '@/components/orders/OrdersTable'
import {getAllOrders} from '@/lib/orders/orders'

async function OrdersPage() {
	const orders = await getAllOrders()
	return (
		<>
			<div className='flex items-center justify-between mb-4 '>
				<h1 className='font-bold text-2xl'>Orders List</h1>
			</div>
			<OrdersTable orders={orders} />
		</>
	)
}

export default OrdersPage
