import { cn } from "@/lib/utils";
import Image from "next/image";
import natures from "@/data/natures.json";
import statAbbreviations from "@/data/extra/stat-abbreviations.json";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";

function NatureChip({
	nature,
	type = "stats",
	orientation = "vertical",
}: {
	nature: string | undefined;
	type?: "stats" | "flavour";
	orientation?: "vertical" | "horizontal";
}) {
	function getNatureAttributes(nature: string | undefined) {
		if (!nature)
			return {
				increased: "???",
				decreased: "???",
				likes: "???",
				dislikes: "???",
			};
		const natureData = natures.find((n) => n.name === nature);
		return natureData
			? natureData
			: {
					increased: "???",
					decreased: "???",
					likes: "???",
					dislikes: "???",
			  };
	}

	const { increased, decreased, likes, dislikes } =
		getNatureAttributes(nature);

	return (
		<div
			className={cn(
				"grid w-full h-full items-center justify-center gap-0.5",
				orientation === "vertical" && "grid-cols-3",
				orientation === "horizontal" && "grid-cols-9"
			)}
		>
			{/* Nature Name */}
			<span
				className={cn(
					"w-full uppercase font-medium text-[0.6rem] text-center rounded shadow px-2 py-0.5 z-40 bg-background text-foreground",
					orientation === "vertical" && "col-span-3",
					orientation === "horizontal" && "col-span-5"
				)}
			>
				{nature || "???"}
			</span>

			{[
				{
					type: "increased",
					icon: <ArrowUpIcon className="w-3 h-3" />,
					color: "green",
				},
				{
					type: "decreased",
					icon: <ArrowDownIcon className="w-3 h-3" />,
					color: "red",
				},
			].map(({ type, icon, color }) => (
				<div
					key={type}
					className={cn(
						`z-30 w-full flex items-center justify-center gap-1 bg-${color}-600/20 border-${color}-600 text-${color}-600 py-0.5 rounded`,
						orientation === "vertical" && "col-span-3",
						orientation === "horizontal" && "col-span-2"
					)}
				>
					{icon}{" "}
					<p className="leading-none font-semibold text-[0.6rem]">
						{statAbbreviations[
							type === "increased" ? increased : decreased
						] || "???"}
					</p>
				</div>
			))}
		</div>
	);
}

export { NatureChip };
