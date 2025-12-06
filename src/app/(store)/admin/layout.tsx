import AdminSideBar from '@/components/AdminSideBar'

export default function AdminLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='flex w-full'>
			<AdminSideBar />
			<section className='m-4 sm:mx-auto '>{children}</section>
		</div>
	)
}
	