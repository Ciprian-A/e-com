async function Item({params}: {params: Promise<{itemId: string}>}) {
  const {itemId} = await params;
  console.log({itemId})
  return (
		<div>
			 {itemId}
		</div>
	)
}

export default Item