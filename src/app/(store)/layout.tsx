import Header from '@/components/Header'
import {ClerkProvider} from '@clerk/nextjs'
import type {Metadata} from 'next'
import '../globals.css'
import {SanityLive} from '@/sanity/lib/live'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider dynamic>
			<html lang='en'>
				<body className={` antialiased`}>
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
