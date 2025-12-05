async function Category({params}: {params: Promise<{categoryId: string}>}) {
  const {categoryId} = await params;
  console.log({categoryId})
  return (
		<div>
			 {categoryId}
		</div>
	)
}

export default Category