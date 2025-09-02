import typographyPlugin from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {background: 'var(--background)', foreground: 'var(--foreground)'}
		}
	},
	plugins: [typographyPlugin]
}

export default config
