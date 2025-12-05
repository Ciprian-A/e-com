import { getOrders } from '@/supabase/lib/orders/getOrders'

async function OrdersPage() {
  const orders = await getOrders()
  console.log({orders})
  return (
    <div>OrdersPage</div>
  )
}

export default OrdersPage