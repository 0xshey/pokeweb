"use client";
import React, { useState, useEffect } from "react";
import P from "@/lib/pokeapi";
import Pokemon from "./pokemon/pokemon";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PokemonSpeciesProps {
	id: string;
}

function PokemonSpecies({ id }: PokemonSpeciesProps) {
	const [species, setSpecies] = useState(null);
	const [defaultVarietyId, setDefaultVarietyId] = useState<string | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const language = "en";

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await P.getPokemonSpeciesByName(id);
				setSpecies(response);

				const defaultVariety = response.varieties.find(
					(variety) => variety.is_default
				);

				if (defaultVariety) {
					setDefaultVarietyId(defaultVariety.pokemon.name);
					console.log(
						"Default Variety ID:",
						defaultVariety.pokemon.name
					);
				}

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
		<div className="w-full flex flex-col items-center gap-8 mt-20">
			{/* Species Name */}
			<h1 className="text-6xl font-medium">
				{species.names.find((name) => name.language.name === language)
					?.name || "???"}
			</h1>

			{/* Varieties */}
			<Tabs
				defaultValue={
					defaultVarietyId || species.varieties[0].pokemon.name
				}
				className="min-w-full flex flex-col"
			>
				<TabsList className="place-self-center">
					{species.varieties.map((variety) => (
						<TabsTrigger
							key={variety.pokemon.name}
							value={variety.pokemon.name}
						>
							<span className="capitalize">
								{variety.pokemon.name
									.split("-")
									.reverse()
									.join(" ")}
							</span>
						</TabsTrigger>
					))}
				</TabsList>
				{species.varieties.map((variety) => (
					<TabsContent
						key={variety.pokemon.name}
						value={variety.pokemon.name}
					>
						<Pokemon id={variety.pokemon.name} />
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}

export default PokemonSpecies;
