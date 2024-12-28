'use client'

import {
	ClerkLoaded,
	SignedIn,
	SignUpButton,
	UserButton,
	useUser
} from '@clerk/nextjs'
import Link from 'next/link'
import {UlistIcon} from '@sanity/icons'
import TooltipHeader from './TooltipHeader'

export const UserInfo = () => {
	const {user} = useUser()
	return (
		<ClerkLoaded>
			<SignedIn>
				<TooltipHeader description='Orders'>
					<Link
						href='/orders'
						className='flex flex-1 relative justify-center sm:justify-start sm:flex-none items-center space-x-2 hover:bg-gray-200 text-black font-bold py-1 px-2 rounded'>
						<UlistIcon className='w-6 h-6' />
					</Link>
				</TooltipHeader>
			</SignedIn>
			{user ? (
				<div className='flex items-center space-x-2'>
					<UserButton />
					<div className='hidden md:block text-xs'>
						<p className='text-gray-400'>Welcome Back</p>
						<p className='font-bold'>{user.firstName}!</p>
					</div>
				</div>
			) : (
				<SignUpButton mode='redirect' />
			)}
		</ClerkLoaded>
	)
}
