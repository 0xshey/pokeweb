"use client";
import { cn } from "@/lib/utils";
import type { StatsTable } from "@/lib/types";
import { getStatTierColor } from "@/lib/formulae";
import statAbreviations from "@/data/extra/stat-abbreviations.json";

export default function StatsChart({ stats }: { stats: StatsTable }) {
	return (
		<table className="w-full">
			<tbody>
				{stats.map((stat) => (
					<tr key={stat.stat.name} className="">
						<td className="text-xs text-muted-foreground capitalize min-w-8">
							{statAbreviations[stat.stat.name] || stat.stat.name}
						</td>
						<td className="text-xs font-mono font-medium min-w-8">
							{stat.base_stat}
						</td>

						<td className="w-full">
							<StatBar value={stat.base_stat} max={255} />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export function StatBar({
	value,
	max,
	type = "base",
}: {
	value: number;
	max: number;
	type: "base" | "actual";
}) {
	const ranges = [
		{ lowerLimit: 0, upperLimit: 39, background: "bg-red-600" },
		{ lowerLimit: 40, upperLimit: 64, background: "bg-orange-600" },
		{ lowerLimit: 65, upperLimit: 79, background: "bg-yellow-600" },
		{ lowerLimit: 80, upperLimit: 89, background: "bg-lime-600" },
		{ lowerLimit: 90, upperLimit: 109, background: "bg-green-600" },
		{ lowerLimit: 110, upperLimit: 129, background: "bg-emerald-600" },
		{ lowerLimit: 130, upperLimit: 149, background: "bg-cyan-600" },
		{ lowerLimit: 150, upperLimit: 255, background: "bg-violet-600" },
		{
			lowerLimit: 255,
			upperLimit: Infinity,
			background: "bg-gradient-to-r from-violet-600 to-pink-600",
		},
	];
	const modifier = type == "actual" ? 2 : 1;
	const color =
		ranges.find(
			({ lowerLimit, upperLimit }) =>
				value >= lowerLimit * modifier && value <= upperLimit * modifier
		)?.background || "bg-gray-500";
	return (
		<div className="w-full h-3 p-0.5 bg-muted border rounded-full overflow-hidden">
			<div
				className={cn(
					"h-full rounded transition-transform duration-300 ",
					color
				)}
				style={{
					width: `${(value / max) * 100}%`,
				}}
			/>
		</div>
	);
}
