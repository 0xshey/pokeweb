"use client";
import { useState, useEffect } from "react";

import P from "@/lib/pokeapi";
// import { parseTeam } from "@/lib/teambuilder";
import { Team } from "@/lib/types";

import { Input } from "@/components/ui/input";
import TeamPokemon from "@/components/team-builder/team-pokemon/team-pokemon";
import TeamBuilderSearchBar from "@/components/team-builder/team-builder-search-bar";

export default function TeamBuilderPage() {
	const [team, setTeam] = useState<any[]>([]);
	const [teamId, setTeamId] = useState<number>(1);

	// use effect to make team

	if (!team) {
		return <div>Loading...</div>;
	}

	("use server");
	async function addPokemonToTeam(pokemonId: string) {
		const pokemon = await P.getPokemonByName(pokemonId);
		setTeam([...team, pokemon]);
		console.log(pokemon);
	}

	return (
		<div className="w-full max-w-4xl flex flex-col items-center mx-auto mt-16 gap-8 px-2">
			<h1 className="text-6xl font-mono mb-8">Builder</h1>
			{team.map((p) => (
				<div key={p.id} className="w-full">
					<TeamPokemon pokemon={p} />
				</div>
			))}
			<TeamBuilderSearchBar handlePokemonResult={addPokemonToTeam} />
		</div>
	);
}
