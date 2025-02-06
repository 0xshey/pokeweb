import { calculateStat } from "@/lib/formulae";
import statAbbreviations from "@/data/extra/stat-abbreviations.json";

// StatsTableProps
interface StatsTableProps {
	stats: {
		base_stat: number;
		stat: {
			name:
				| "hp"
				| "attack"
				| "defense"
				| "special-attack"
				| "special-defense"
				| "speed";
		};
	}[];
}

export default function StatsTable({ stats }: StatsTableProps) {
	return (
		<table className="w-full text-left">
			<tbody>
				{stats.map((stat) => (
					<tr key={stat.stat.name} className="h-10 border-b">
						<th className="min-w-16">
							<div className="font-medium">
								{statAbbreviations[stat.stat.name] ||
									stat.stat.name}
							</div>
						</th>
						<td className="min-w-8 text-right">{stat.base_stat}</td>
						<td className="w-full px-2">
							<div className="w-full h-4 bg-muted border rounded overflow-hidden">
								<div
									className="h-full bg-green-500 rounded"
									style={{
										width: `${
											(stat.base_stat / 255) * 100
										}%`,
									}}
								/>
							</div>
						</td>
						<td className="min-w-12 text-right">
							{calculateStat(
								stat.stat.name,
								stat.base_stat,
								0,
								0,
								100
							)}
						</td>
						<td className="min-w-12 text-right">
							{calculateStat(
								stat.stat.name,
								stat.base_stat,
								31,
								252,
								100
							)}
						</td>
					</tr>
				))}
				<tr className="h-10">
					<th className="text-muted-foreground">Total</th>
					<td>
						{stats.reduce(
							(total, stat) => total + stat.base_stat,
							0
						)}
					</td>
					<td></td>
					<td className="text-right text-muted-foreground">MIN</td>
					<td className="text-right text-muted-foreground">MAX</td>
				</tr>
			</tbody>
		</table>
	);
}
