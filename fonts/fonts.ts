import { Public_Sans, JetBrains_Mono } from 'next/font/google'

export const fontSans = Public_Sans({
	subsets: ['latin'],
	variable: '--font-sans',
})

export const fontMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
})