import React from 'react'
import Form from 'next/form'

export const Search = () => {
	return (
		<Form action='/search' className='w-full sm:w-auto sm:flex-1'>
			<input
				type='text'
				name='query'
				placeholder='Search for a product'
				className='w-full h-full bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50  max-w-4xl'
			/>
		</Form>
	)
}
