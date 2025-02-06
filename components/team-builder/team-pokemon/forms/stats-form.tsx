"use client";
import type { Pokemon } from "@/lib/pokeapi-types";

import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormLabel,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import statAbbreviations from "@/data/extra/stat-abbreviations.json";
import { StatBar } from "@/components/stats/stats-chart";
import { calculateStat } from "@/lib/formulae";

export default function StatsForm({
	form,
	pokemon,
}: {
	form: any;
	pokemon: Pokemon;
}) {
	return (
		<table className="w-full">
			<thead>
				<th className="text-[0.5rem] tracking-wider text-muted-foreground uppercase pl-0.5 text-left">
					Stats
				</th>
				<th></th>
				<th></th>
				<th className="text-[0.5rem] tracking-wider text-muted-foreground uppercase pl-0.5 text-left">
					EV's
				</th>
				<th className="text-[0.5rem] tracking-wider text-muted-foreground uppercase pl-0.5 text-left">
					IV's
				</th>
			</thead>
			<tbody>
				{pokemon.stats.map(({ stat, base_stat }) => {
					const statName = stat.name;
					const statAbbreviation = statAbbreviations[statName];
					const statKey = statAbbreviation.toLowerCase();
					const baseStat = Math.floor(base_stat);
					const evValue = Math.floor(form.watch().evs[statKey]);
					const ivValue = Math.floor(form.watch().ivs[statKey]);
					const nature = form.watch().nature;
					const calculatedStat = calculateStat(
						statName,
						baseStat,
						ivValue,
						evValue,
						Math.floor(form.watch().level),
						nature
					);

					// return (
					// 	<tr>
					// 		<td>{statName}</td>
					// 		<td>{statAbbreviation}</td>
					// 		<td>{statKey}</td>
					// 		<td>{baseStat}</td>
					// 		<td>{form.watch().evs[statKey]}</td>
					// 		<td>{form.watch().ivs[statKey]}</td>
					// 	</tr>
					// );

					return (
						<tr key={stat.name}>
							<td className="text-xs text-muted-foreground capitalize min-w-8">
								{statAbbreviation}
							</td>
							<td className="text-xs font-mono font-medium min-w-8">
								{calculatedStat}
							</td>
							<td className="w-full">
								<StatBar
									value={calculatedStat}
									max={510}
									type="actual"
								/>
							</td>
							<td>
								<Form {...form}>
									<FormField
										control={form.control}
										name={`evs.${statKey}`}
										render={({ field }) => (
											<input
												type="number"
												className="min-w-full text-xs px-2 py-1 rounded-md border border-input bg-transparent shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
												min={0}
												max={255}
												value={field.value}
												onChange={field.onChange}
											/>
										)}
									/>
								</Form>
							</td>
							<td>
								<Form {...form}>
									<FormField
										control={form.control}
										name={`ivs.${statKey}`}
										render={({ field }) => (
											<input
												type="number"
												className="min-w-full text-xs px-2 py-1 rounded-md border border-input bg-transparent shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
												min={0}
												max={31}
												value={field.value}
												onChange={field.onChange}
											/>
										)}
									/>
								</Form>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
