"use client";

import { TrendingUp } from "lucide-react";
import {
	Bar,
	BarChart,
	XAxis,
	YAxis,
	Rectangle,
	LabelList,
	ReferenceLine,
} from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const statAbbreviations = {
	hp: "HP",
	attack: "Atk",
	"special-attack": "SpA",
	defense: "Def",
	"special-defense": "SpD",
	speed: "Spe",
} as const;

const chartConfig = {
	hp: {
		label: "HP",
		color: "hsl(var(--chart-1))",
	},
	attack: {
		label: "Atk",
		color: "hsl(var(--chart-1))",
	},
	"special-attack": {
		label: "SpA",
		color: "hsl(var(--chart-2))",
	},
	defense: {
		label: "Def",
		color: "hsl(var(--chart-3))",
	},
	"special-defense": {
		label: "SpD",
		color: "hsl(var(--chart-4))",
	},
	speed: {
		label: "Spe",
		color: "hsl(var(--chart-5))",
	},
} satisfies ChartConfig;

interface StatsBarChartProps {
	data: {
		stat: string;
		value: number;
		fill: string;
	}[];
}

export default function StatsBarChart({ data }: StatsBarChartProps) {
	return (
		<ChartContainer config={chartConfig}>
			<BarChart
				accessibilityLayer
				data={data}
				layout="vertical"
				margin={{
					left: 20,
					right: 20,
					top: 20,
					bottom: 20,
				}}
				barSize={30}
			>
				<ReferenceLine x={45} />
				<ReferenceLine x={65} />
				<ReferenceLine x={80} />
				<ReferenceLine x={90} />
				<ReferenceLine x={110} />
				<ReferenceLine x={130} />
				<ReferenceLine x={150} />
				<ReferenceLine x={180} />

				<YAxis
					dataKey="stat"
					type="category"
					tickLine={true}
					tickMargin={10}
					axisLine={false}
					hide
				/>
				<XAxis dataKey="value" type="number" hide />
				<ChartTooltip
					cursor={false}
					content={
						<ChartTooltipContent
							hideLabel
							formatter={(value, name, props) =>
								`${props.payload.stat}: ${value}`
							}
						/>
					}
				/>
				<Bar dataKey="value" layout="vertical" shape={<StatBar />}>
					<LabelList
						dataKey="value"
						position="insideRight"
						offset={8}
						className="fill-[--color-label] font-bold text-base"
						fontSize={12}
					/>
					<LabelList
						dataKey="stat"
						formatter={(value) => statAbbreviations[value]}
						position="insideLeft"
						offset={8}
						className="fill-[--color-label] text-base"
						fontSize={12}
					/>
				</Bar>
			</BarChart>
		</ChartContainer>
	);
}

function calculateStatColor(value: number): string | undefined {
	// Define the ranges and their associated colors
	const statRanges = [
		{ min: 0, max: 44, color: "#EF4444" }, // Very low
		{ min: 45, max: 64, color: "#F97316" }, // Low
		{ min: 65, max: 79, color: "#F59E0B" }, // Mediocre/Average
		{ min: 80, max: 89, color: "#FACC15" }, // Decent
		{ min: 90, max: 109, color: "#84CC16" }, // Good
		{ min: 110, max: 129, color: "#22C55E" }, // Great
		{ min: 130, max: 149, color: "#10B981" }, // Outstanding
		{ min: 150, max: 179, color: "#14B8A6" }, // Top tier
		{ min: 180, max: 255, color: "#06B6D4" }, // High outlier
	];

	// Find and return the color for the given value
	for (const { min, max, color } of statRanges) {
		if (value >= min && value < max) {
			return color;
		}
	}

	// Return undefined if no range matches (optional safeguard)
	return undefined;
}

const StatBar = (props) => {
	const { stat, value } = props;
	const fill = calculateStatColor(value);

	return (
		<Rectangle
			{...props}
			fill={fill}
			className={`recharts-bar-rectangle ${value}`}
			radius={5}
			fillOpacity={0.8}
		/>
	);
};
