"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import P from "@/lib/pokeapi";
import { calculateStat } from "@/lib/formulae";

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";

import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableCell,
	TableHead,
	TableCaption,
} from "@/components/ui/table";

// write the stat abbreviations
const statAbbreviations = {
	hp: "HP",
	attack: "Atk",
	defense: "Def",
	"special-attack": "SpA",
	"special-defense": "SpD",
	speed: "Spe",
};

interface PokemonProps {
	id: string;
}

function Pokemon({ id }: PokemonProps) {
	const [pokemon, setPokemon] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// user defined
	const [pokemonLevel, setPokemonLevel] = useState(50);
	const [pokemonEVs, setPokemonEVs] = useState({
		hp: 0,
		atk: 0,
		def: 0,
		spa: 0,
		spd: 0,
		spe: 0,
	});
	const [pokemonIVs, setPokemonIVs] = useState({
		hp: 31,
		atk: 31,
		def: 31,
		spa: 31,
		spd: 31,
		spe: 31,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const pokemonData = await P.getPokemonByName(id);
				setPokemon(pokemonData);
				console.log("Pokemon:", pokemonData);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div>
			{pokemon && (
				<Card>
					<CardContent>
						<div className="flex flex-col items-center">
							<Image
								src={
									pokemon.sprites.other["official-artwork"]
										.front_default
								}
								alt={pokemon.name}
								width={300}
								height={200}
							/>
							{/* Types */}
							<div className="flex items-center gap-2">
								<p>Types:</p>
								{pokemon.types.map((type) => (
									<div
										key={type.type.name}
										className="px-2 py-1 border"
									>
										{type.type.name}
									</div>
								))}
							</div>
							<div className="">
								<div>{(pokemon.height / 10).toFixed(1)}m</div>
								<div>{(pokemon.weight / 10).toFixed(1)}kg</div>
							</div>
							{/* Abilities */}
							<div>
								{pokemon.abilities.map((ability) => (
									<div key={ability.ability.name}>
										{ability.ability.name}
									</div>
								))}
							</div>
							{/* <StatsBarChart
							data={pokemon.stats.map((stat) => ({
								stat: stat.stat.name,
								value: stat.base_stat,
							}))}
												/> */}
							<table className="w-full text-left">
								<tbody>
									{pokemon.stats.map((stat) => (
										<tr
											key={stat.stat.name}
											className="h-10"
										>
											<th className="min-w-16">
												<div className="font-medium">
													{statAbbreviations[
														stat.stat.name
													] || stat.stat.name}
												</div>
											</th>
											<td className="min-w-8 text-right">
												{stat.base_stat}
											</td>
											<td className="w-full px-2">
												<div className="w-full h-4 bg-muted border rounded overflow-hidden">
													<div
														className="h-full bg-green-500"
														style={{
															width: `${
																(stat.base_stat /
																	255) *
																100
															}%`,
														}}
													></div>
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
									<tr>
										<th className="text-muted-foreground">
											Total
										</th>
										<td>
											{pokemon.stats.reduce(
												(total, stat) =>
													total + stat.base_stat,
												0
											)}
										</td>
										<td></td>
										<td className="text-right text-muted-foreground">
											MIN
										</td>
										<td className="text-right text-muted-foreground">
											MAX
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						{/* <pre className="mt-20 border-t">
							{Object.keys(pokemon).join(",\n")}
						</pre> */}
						{/* <pre>{JSON.stringify(pokemon.stats, null, 2)}</pre> */}
					</CardContent>
				</Card>
			)}
		</div>
	);
}

export default Pokemon;
