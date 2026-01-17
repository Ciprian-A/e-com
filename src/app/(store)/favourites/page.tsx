export default async function FavouritesPage() {
	// const allFavouriteProducts = await getAllFavouriteProducts()
	if (0 === 0) {
		// if (allFavouriteProducts.length === 0) {
		return (
			<div className='container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]'>
				<h1 className='text-2xl font-bold mb-6 text-gray-800'>
					Nothing to see here yet...
				</h1>
				<p className='text-gray-600 text-xl flex flex-col justify-center items-center'>
					<span>Save your favourite items by tapping the ❤️ icon.</span>
					<span>They will show up here for easy access anytime.</span>
				</p>
			</div>
		)
	}
	return <div></div>
}

//{<ProductsView products={allFavouriteProducts} />}
