import "@/styles/globals.css";
import {
	FontProvider,
	MetaProvider,
	ThemeProvider,
} from "@/components/providers";

type LayoutProps = {
	children: React.ReactNode;
};

export default function BaseLayout({ children }: LayoutProps) {
	return (
		<html>
			<MetaProvider />
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<FontProvider>{children}</FontProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
