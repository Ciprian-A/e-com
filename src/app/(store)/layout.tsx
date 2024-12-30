import Header from '@/components/Header'
import {ClerkProvider} from '@clerk/nextjs'
import type {Metadata} from 'next'
import '../globals.css'
import {SanityLive} from '@/sanity/lib/live'
import {VisualEditing} from 'next-sanity'
import {draftMode} from 'next/headers'
import {DisableDraftMode} from '@/components/DisableDraftMode'

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
