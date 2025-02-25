import Image from "next/image";
import types from "@/data/types.json";

function TypeChip({
	type,
	size = "md",
}: {
	type: string | undefined;
	size?: "icon" | "sm" | "md" | "lg";
}) {
	const sizeClasses = {
		sm: "px-1 py-0.5 min-w-24 text-xs",
		md: "px-2 py-1 min-w-28 text-lg",
		lg: "px-3 py-1.5 min-w-36 text-2xl",
		icon: "p-1 rounded-full",
	};
	function getColor(type: string | undefined) {
		if (!type) return "#A8A8A8"; // Medium gray as fallback for undefined
		const color = types.find((t) => t.name === type)?.color;
		return color ? color : "#A8A8A8"; // Medium gray as fallback
	}

	return (
		<div
			className={`flex items-center justify-center gap-2 rounded border shadow ${sizeClasses[size]}`}
			style={{ backgroundColor: getColor(type) }}
		>
			{type && (
				<Image
					src={`/images/type-icons/${type}.svg`}
					alt={type}
					width={
						size === "sm" || size === "icon"
							? 16
							: size === "lg"
							? 24
							: size === "md"
							? 20
							: 16
					}
					height={
						size === "sm" || size === "icon"
							? 16
							: size === "lg"
							? 24
							: size === "md"
							? 20
							: 16
					}
				/>
			)}
			<span
				className={`font-mono uppercase font-bold ${
					size == "icon" && "hidden"
				}`}
			>
				{type || "???"}
			</span>
		</div>
	);
}

export { TypeChip };
