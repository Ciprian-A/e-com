import AdminSideBar from '@/components/AdminSideBar'

export default function AdminLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='flex w-full'>
			<AdminSideBar />
			<section className='my-4 mx-auto '>{children}</section>
		</div>
	)
}
	