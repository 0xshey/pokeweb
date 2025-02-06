"use client";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Label } from "recharts";

import { useMemo } from "react";

export default function ODChart({
	atk,
	spatk,
	def,
	spdef,
	size = "md",
}: {
	atk: number;
	spatk: number;
	def: number;
	spdef: number;
	size?: "md" | "lg";
}) {
	const dimensions = useMemo(() => {
		if (size === "lg") {
			return { width: 300, height: 200, textSize: "text-base" };
		}
		return { width: 180, height: 144, textSize: "text-xs" };
	}, [size]);

	const chartData = useMemo(
		() => [
			{ name: "Atk", value: atk },
			{ name: "SpAtk", value: spatk },
			{ name: "SpDef", value: spdef },
			{ name: "Def", value: def },
		],
		[atk, spatk, def, spdef]
	);

	return (
		<RadarChart
			cx="50%"
			cy="50%"
			outerRadius="80%"
			width={dimensions.width}
			height={dimensions.height}
			startAngle={135}
			endAngle={-225}
			data={chartData}
			className={`${dimensions.textSize} group`}
		>
			<PolarGrid className="fill-muted opacity-5" />
			<PolarAngleAxis
				dataKey="stat"
				tick={({ x, y, textAnchor, index, ...props }) => {
					const stat = chartData[index];
					const adjY = index === 2 || index === 3 ? y - 15 : y + 20;
					return (
						<text
							x={x}
							y={adjY}
							textAnchor={textAnchor}
							{...props}
							fill="currentColor"
						>
							<tspan className="text-transparent group-hover:text-foreground transition-colors duration-300">
								{stat.value}
							</tspan>
							<tspan
								x={x}
								y={
									index === 2 || index === 3
										? adjY - 30 // defensive labels
										: adjY - 5 // offensive labels
								} // moves the label above the value
								dy={"1rem"}
								fontSize={12}
								className="text-[0.6rem] text-transparent group-hover:text-muted-foreground transition-colors duration-300"
							>
								{stat.name}
							</tspan>
						</text>
					);
				}}
			/>
			<Radar
				name="Stats"
				dataKey="value"
				fill="#8884d8"
				fillOpacity={0.5}
			/>
		</RadarChart>
	);
}
