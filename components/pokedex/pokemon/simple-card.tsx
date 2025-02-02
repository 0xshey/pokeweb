"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import type { Pokemon } from "@/lib/pokeapi-types";
import P from "@/lib/pokeapi";

import { TypeChip } from "@/components/pokedex/type";
import { AbilityChip } from "@/components/pokedex/ability";

import ODChart from "../stats/od-chart";

interface PokemonSimpleCardProps {
	id: string;
}

function PokemonSimpleCard({ id }: PokemonSimpleCardProps) {
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const pokemon: Pokemon = await P.getPokemonByName(id);
				setPokemon(pokemon);
				console.log("Pokemon:", pokemon);
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
		<div className="w-full grid grid-cols-8 items-center border rounded px-4 py-1 gap-4 mt-16">
			<div className="col-span-1 flex justify-center">
				<Image
					src={pokemon.sprites.front_default}
					alt={pokemon.name}
					width={72}
					height={72}
					quality={100}
					className=""
				/>
			</div>

			<div className="col-span-3 flex flex-col justify-center gap-2">
				<p className="text-xl font-medium capitalize">
					{pokemon.name.split("-").reverse().join(" ")}
				</p>
				<div className="flex items-center gap-2">
					{pokemon.types.map((type) => (
						<TypeChip
							key={type.type.name}
							type={type.type.name}
							size="sm"
						/>
					))}
				</div>
			</div>

			<div className="col-span-2">
				<div className="flex flex-col items-start gap-2">
					{pokemon.abilities.map((ability) => (
						<AbilityChip
							key={ability.ability.name}
							id={ability.ability.name}
							hidden={ability.is_hidden}
							size="sm"
						/>
					))}
				</div>
			</div>
			<div className="col-span-1">
				<ODChart
					atk={pokemon.stats[1].base_stat}
					def={pokemon.stats[2].base_stat}
					spatk={pokemon.stats[3].base_stat}
					spdef={pokemon.stats[4].base_stat}
				/>
			</div>
		</div>
	);
}

export default PokemonSimpleCard;
