"use client";
import { StatsTable } from "@/lib/types";
import statAbbreviations from "@/data/extra/stat-abbreviations.json";

import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export default function StatsForm({
	form,
	baseStats,
}: {
	form: any;
	baseStats: StatsTable;
}) {
	return (
		<Form {...form}>
			{/* <pre>{JSON.stringify(baseStats, null, 2)}</pre> */}
			<p>
				Total EV's allocated:{" "}
				{Object.values(form.getValues("evs")).reduce(
					(acc: number, curr: number) => Number(acc) + Number(curr),
					0
				)}
				/510
			</p>
			<table>
				<thead>
					<tr>
						<th className="min-w-24">Base Stats</th>
						<th className="w-full">EVs</th>
						<th className="min-w-24">IVs</th>
					</tr>
				</thead>
				<tbody>
					{baseStats.map((stat) => (
						<tr key={stat.stat.name}>
							<td>
								<div className="flex gap-2 justify-between px-2">
									<p>{statAbbreviations[stat.stat.name]}</p>
									<p>{stat.base_stat}</p>
								</div>
							</td>
							<td className="w-full px-16">
								<FormField
									control={form.control}
									name={`evs.${statAbbreviations[
										stat.stat.name
									].toLowerCase()}`}
									render={({ field }) => (
										<FormControl>
											<div className="flex items-center gap-2 w-full">
												<Slider
													min={0}
													max={252}
													defaultValue={[field.value]}
													onValueChange={(vals) => {
														field.onChange(vals[0]);
													}}
												/>
												<p className="w-16 text-center">
													{field.value}
												</p>
											</div>
										</FormControl>
									)}
								/>
							</td>
							<td>
								<FormField
									control={form.control}
									name={`ivs.${statAbbreviations[
										stat.stat.name
									].toLowerCase()}`}
									render={({ field }) => (
										<FormControl>
											<Input
												type="number"
												defaultValue={field.value}
												onChange={(e) => {
													field.onChange(
														Number(e.target.value)
													);
												}}
												min={0}
												max={31}
											/>
										</FormControl>
									)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Form>
	);
}
