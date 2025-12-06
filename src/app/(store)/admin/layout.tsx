import AdminSideBar from '@/components/AdminSideBar'

export default function AdminLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='flex w-full'>
			<AdminSideBar />
			<section className='mt-3 mb-3 mx-auto '>{children}</section>
		</div>
	)
}
	