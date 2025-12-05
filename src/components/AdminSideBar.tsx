'use client'

import { ChevronRight, ShoppingBasket, Store, Tag, Tags } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  {
		title: 'Items',
		url: '/items',
		icon: Store
	},
	{
		title: 'Categories',
		url: '/categories',
		icon: Tags
	},
	{
		title: 'Orders',
		url: '/orders',
		icon: ShoppingBasket
	},
	{
		title: 'Promo Codes',
		url: '/promoCode',
		icon: Tag
	}
]
function AdminSideBar() {
  const sidebar = useSidebar()
  const pathname = usePathname()
  console.log({pathname});
	return (
		<Sidebar
			className='relative bg-red-300'
			collapsible='icon'
			variant='sidebar'>
			<SidebarHeader className=''>
				<SidebarTrigger />
				<span
					className={cn(
						'transition-all duration-200 ease-linear',
						sidebar.state === 'collapsed'
							? ' hidden'
							: 'visible'
					)}>
					Admin Panel
				</span>
			</SidebarHeader>
			<SidebarSeparator />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map(item => {
                const href = `/admin${item.url}`
								const isActive = pathname === href

              return (
								<SidebarMenuItem title={item.title} key={item.title}>
									<SidebarMenuButton
										asChild
										className={cn(
											isActive
												? 'bg-black text-white'
												: ''
										)}>
										<Link href={`/admin${item.url}`}>
											<item.icon />
											<span>{item.title}</span>
                      <ChevronRight className='ml-auto' />
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							)})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}

export default AdminSideBar
