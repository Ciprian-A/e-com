export const metadata = {
	title: 'Shoppy - Studio',
	description: 'Shoppy Studio CMS'
}

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	)
}
