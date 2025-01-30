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

import { TypeChip } from "@/components/pokedex/type";
import { AbilityChip } from "@/components/pokedex/ability";
import StatsTable from "./stats-table";

// write the stat abbreviations

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
						<div className="flex flex-col items-center gap-8">
							<div className="w-full flex justify-between items-center mt-4 px-4">
								<p className="text-2xl font-medium capitalize">
									{pokemon.name
										.split("-")
										.reverse()
										.join(" ")}
								</p>
								{/* Types */}
								<div className="flex items-center gap-2">
									{pokemon.types.map((type) => (
										<TypeChip
											key={type.type.name}
											type={type.type.name}
										/>
									))}
								</div>
							</div>

							<div className="w-full grid grid-cols-5 gap-4">
								<div className="col-span-3">
									<div className="w-full flex justify-center items-center rounded border">
										<Image
											src={
												pokemon.sprites.other[
													"official-artwork"
												].front_default
											}
											alt={pokemon.name}
											width={400}
											height={400}
											className=""
										/>
									</div>
								</div>
								<div className="flex flex-col gap-4 col-span-2">
									<InformationTable pokemon={pokemon} />
								</div>
							</div>
							<StatsTable stats={pokemon.stats} />

							{/* Moves */}
							<div className="w-full">
								<h2 className="text-2xl font-medium">Moves</h2>
								<pre>
									{JSON.stringify(pokemon.sprites, null, 2)}
								</pre>
							</div>

							{/* <pre>{JSON.stringify(pokemon.forms, null, 2)}</pre> */}
						</div>
						<pre className="mt-20 border-t">
							{Object.keys(pokemon).join(",\n")}
						</pre>
						{/* <pre>{JSON.stringify(pokemon.stats, null, 2)}</pre> */}
					</CardContent>
				</Card>
			)}
		</div>
	);
}

function InformationTable({ pokemon }) {
	return (
		<Table>
			<TableBody>
				{/* National Dex Num */}
				<TableRow>
					<TableHead>National Dex &#8470;</TableHead>
					<TableCell>{pokemon.id}</TableCell>
				</TableRow>

				{/* Height */}
				<TableRow>
					<TableHead>Height</TableHead>
					<TableCell>{(pokemon.height / 10).toFixed(1)} m</TableCell>
				</TableRow>

				{/* Weight */}
				<TableRow>
					<TableHead>Weight</TableHead>
					<TableCell>{(pokemon.weight / 10).toFixed(1)} kg</TableCell>
				</TableRow>

				{/* Abilities */}
				<TableRow>
					<TableHead>Abilities</TableHead>
					<TableCell>
						<div className="flex flex-col items-start gap-2">
							{pokemon.abilities.map((ability) => (
								<AbilityChip
									key={ability.ability.name}
									id={ability.ability.name}
									hidden={ability.is_hidden}
								/>
							))}
						</div>
					</TableCell>
				</TableRow>

				{/* Base Experience */}
				<TableRow>
					<TableHead>Base Experience</TableHead>
					<TableCell>{pokemon.base_experience}</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}

export default Pokemon;
