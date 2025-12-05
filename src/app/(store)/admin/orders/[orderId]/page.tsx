async function Order({params}: {params: Promise<{orderId: string}>}) {
  const {orderId} = await params;
  console.log({orderId})
  return (
		<div>
			 {orderId}
		</div>
	)
}

export default Order