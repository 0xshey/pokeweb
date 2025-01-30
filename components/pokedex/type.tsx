import Image from "next/image";
import { getColor } from "@/lib/type-colors";

function TypeChip({
	type,
	size = "md",
}: {
	type: string;
	size?: "sm" | "md" | "lg";
}) {
	const sizeClasses = {
		sm: "px-1 py-0.5 w-20 text-sm",
		md: "px-2 py-1 w-28 text-xl",
		lg: "px-3 py-1.5 w-36 text-2xl",
	};

	return (
		<div
			className={`flex items-center justify-center gap-2 rounded border shadow ${sizeClasses[size]}`}
			style={{ backgroundColor: getColor(type) }}
		>
			<Image
				src={`/images/type-icons/${type}.svg`}
				alt={type}
				width={size === "sm" ? 16 : size === "lg" ? 24 : 20}
				height={size === "sm" ? 16 : size === "lg" ? 24 : 20}
			/>
			<span className="font-condensed uppercase font-bold">{type}</span>
		</div>
	);
}

export { TypeChip };
