'use client'

export default function PrintButton() {
	return (
		<button
			onClick={() => window.print()}
			className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors print:hidden'>
			Print Order
		</button>
	)
}
