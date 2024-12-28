'use client'

import {
	ClerkLoaded,
	SignedIn,
	SignUpButton,
	UserButton,
	useUser
} from '@clerk/nextjs'

import Orders from './Orders'

export const UserInfo = () => {
	const {user} = useUser()
	return (
		<ClerkLoaded>
			<SignedIn>
				<Orders />
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
