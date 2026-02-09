'use server'
import {currentUser} from '@clerk/nextjs/server'
import {prisma} from '../../../../config/db'

export async function syncUser() {
	const clerkUser = await currentUser()
	if (!clerkUser) return null

	const user = await prisma.user.upsert({
		where: {id: clerkUser.id},
		update: {
			email: clerkUser.emailAddresses[0].emailAddress,
			name: clerkUser.firstName ?? 'User'
		},
		create: {
			id: clerkUser.id,
			email: clerkUser.emailAddresses[0].emailAddress,
			name: clerkUser.firstName ?? 'User'
		}
	})

	return user
}

export async function getCurrentUserFromDB() {
	try {
		const clerkUser = await currentUser()
		if (!clerkUser) return null
		const user = await prisma.user.findUnique({
			where: {id: clerkUser.id}
		})
		return user
	} catch (error) {
		console.log('Error getting current user from DB:', error)
		throw new Error('Failed to get current user from DB.')
	}
}
