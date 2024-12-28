import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {SignOutButton} from '@clerk/nextjs'
import Orders from './Orders'
import TooltipHeader from './TooltipHeader'

import {UserIcon, LeaveIcon} from '@sanity/icons'

const User = ({username}: {username: string}) => {
	return (
		<TooltipHeader description='Your account'>
			<div className='hover:bg-gray-200 py-1 px-2 rounded'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<UserIcon className='w-6 h-6 ' />
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-56'>
						<DropdownMenuLabel>
							{username && (
								<div className='flex items-center space-x-2'>
									<UserIcon className='w-6 h-6 ' />
									<div className='hidden md:block text-xs'>
										<p className='text-gray-400'>Welcome Back</p>
										<p className='font-bold'>{username}!</p>
									</div>
								</div>
							)}
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Orders />
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<SignOutButton>
								<div className='flex items-center space-x-2 cursor-pointer'>
									<LeaveIcon className='w-6 h-6 ' />
									<span>Log Out</span>
								</div>
							</SignOutButton>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</TooltipHeader>
	)
}

export default User
