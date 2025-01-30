import { Public_Sans, JetBrains_Mono, Sofia_Sans_Condensed } from 'next/font/google'

export const fontSans = Public_Sans({
	subsets: ['latin'],
	variable: '--font-sans',
})

export const fontMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
})

export const fontCondensed = Sofia_Sans_Condensed({
	subsets: ['latin'],
	variable: '--font-condensed',
})