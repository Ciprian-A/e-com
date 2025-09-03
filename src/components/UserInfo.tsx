'use client'

import { ClerkLoaded, SignedIn, SignUpButton, useUser } from '@clerk/nextjs'

import User from './User'

export const UserInfo = () => {
	const {user} = useUser()
	return (
		<ClerkLoaded>
			{user && user.firstName ? (
				<SignedIn>
					<User username={user.firstName} />
				</SignedIn>
			) : (
				<SignUpButton mode='redirect' />
			)}
		</ClerkLoaded>
	)
}
