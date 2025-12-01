'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
	ClerkLoaded,
	SignedIn,
	SignOutButton,
	SignUpButton,
	useUser
} from '@clerk/nextjs'
import { LogInIcon, LogOutIcon, UserRoundIcon } from 'lucide-react'
import Orders from './Orders'
import TooltipHeader from './TooltipHeader'

const User = () => {
	const {user} = useUser()
	return (
		<div className='hover:bg-gray-200 py-1 px-2 rounded cursor-pointer'>
			<DropdownMenu>
				<TooltipHeader description='Your account'>
					<DropdownMenuTrigger asChild>
						<UserRoundIcon className='w-6 h-6 ' />
					</DropdownMenuTrigger>
				</TooltipHeader>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>
						<ClerkLoaded>
							{user && user.firstName ? (
								<div className='flex items-center space-x-2'>
									<UserRoundIcon className='w-4 h-4 ' />
									<div className='hidden md:block text-xs'>
										<p className='text-gray-400'>Welcome Back</p>
										<SignedIn>{user.firstName}</SignedIn>
									</div>
								</div>
							) : (
								<div className='flex items-center space-x-2'>
									<LogInIcon className='w-4 h-4 ' />
									<SignUpButton mode='redirect' />
								</div>
							)}
						</ClerkLoaded>
					</DropdownMenuLabel>
					{user && (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem className='hover:bg-gray-100'>
									<Orders />
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem className='hover:bg-gray-100'>
								<SignOutButton>
									<div className='flex items-center space-x-2 cursor-pointer'>
										<LogOutIcon className='w-4 h-4 ' />
										<span>Log Out</span>
									</div>
								</SignOutButton>
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default User
