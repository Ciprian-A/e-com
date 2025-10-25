import { DisableDraftMode } from '@/components/DisableDraftMode'
import Header from '@/components/Header'
import { SanityLive } from '@/sanity/lib/live'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'
import '../globals.css'

export const metadata: Metadata = {
	title: 'Shoppy - Home',
	description: 'Shoppy E-Commerce app'
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider dynamic>
			<html lang='en'>
				<body className={` antialiased`}>
					{(await draftMode()).isEnabled && (
						<>
							<DisableDraftMode />
							<VisualEditing />
						</>
					)}
					<main>
						<Header />
						{children}
					</main>
					<SanityLive />
				</body>
			</html>
		</ClerkProvider>
	)
}
