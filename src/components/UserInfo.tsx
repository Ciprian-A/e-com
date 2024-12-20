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

export const UserInfo = () => {
	const {user} = useUser()
	return (
		<ClerkLoaded>
			<SignedIn>
				<Link
					href='/orders'
					className='flex flex-1 relative justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
					<UlistIcon className='w-6 h-6' />
					<span>My Orders</span>
				</Link>
			</SignedIn>
			{user ? (
				<div className='flex items-center space-x-2'>
					<UserButton />
					<div className='hidden sm:block text-xs'>
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
