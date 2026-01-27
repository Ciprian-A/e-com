'use client'

import {useAuthModal} from '@/app/(store)/authModalStore'
import {Button} from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import {SignInButton, SignUpButton} from '@clerk/nextjs'
import {usePathname} from 'next/navigation'

export default function AuthRequiredModal() {
	const {isOpen, close} = useAuthModal()
	const pathname = usePathname()

	return (
		<Dialog open={isOpen} onOpenChange={close}>
			<DialogContent className='max-w-sm rounded-xl p-6'>
				<DialogHeader>
					<DialogTitle className='text-xl font-semibold'>
						Sign in to save favourites
					</DialogTitle>
					<DialogDescription className='text-sm text-muted-foreground'>
						Create an account or sign in to keep track of your favourite items.
					</DialogDescription>
				</DialogHeader>

				<div className='flex flex-col gap-3 mt-4'>
					<SignInButton mode='modal' fallbackRedirectUrl={pathname}>
						<Button className='w-full' size='lg' onClick={close}>
							Log in
						</Button>
					</SignInButton>

					<SignUpButton mode='modal' fallbackRedirectUrl={pathname}>
						<Button
							variant='outline'
							className='w-full'
							size='lg'
							onClick={close}>
							Create account
						</Button>
					</SignUpButton>
				</div>
			</DialogContent>
		</Dialog>
	)
}
