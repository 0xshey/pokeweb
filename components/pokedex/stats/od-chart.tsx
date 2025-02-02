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
		return { width: 150, height: 100, textSize: "text-xs" };
	}, [size]);

	const chartData = useMemo(
		() => [
			{ name: "Atk", value: atk },
			{ name: "SpAtk", value: spatk },
			{ name: "Def", value: def },
			{ name: "SpDef", value: spdef },
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
			className={`${dimensions.textSize} `}
		>
			<PolarGrid className="fill-muted opacity-5" />
			<PolarAngleAxis
				dataKey="stat"
				tick={({ x, y, textAnchor, index, ...props }) => {
					const stat = chartData[index];
					return (
						<text
							x={x}
							y={y * 1.1}
							textAnchor={textAnchor}
							{...props}
							fill="currentColor"
						>
							<tspan>{stat.value}</tspan>
							<tspan
								x={x}
								y={index === 2 || index === 3 ? y - 25 : y} // moves the label above the value
								dy={"1rem"}
								fontSize={12}
								className="fill-muted-foreground text-[0.6rem]"
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
