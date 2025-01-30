import { cn } from "@/lib/utils";
import { fontSans, fontMono, fontCondensed } from "@/fonts/fonts";

export default function FontProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div
			className={cn(
				fontSans.className, // default font
				fontMono.variable,
				fontCondensed.variable
			)}
		>
			{children}
		</div>
	);
}
