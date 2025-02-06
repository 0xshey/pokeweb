"use client";

import { usePokemonForm } from "./forms";

import Preview from "./preview";
import BasicInfoForm from "./forms/basic-info-form";
import ModifierInfoForm from "./forms/modifier-info-form";
import MovesForm from "./forms/moves-form";
import StatsForm from "./forms/stats-form";

export default function TeamPokemonEditor({ pokemon }: { pokemon: any }) {
	const form = usePokemonForm();

	return (
		<div className="w-full flex flex-col space-y-4">
			<Preview pokemon={pokemon} data={form.watch()} />
			<BasicInfoForm form={form} />
			<ModifierInfoForm
				form={form}
				potentialAbilities={pokemon.abilities}
				// add items later
			/>
			<MovesForm form={form} potentialMoves={pokemon.moves} />
			<StatsForm form={form} baseStats={pokemon.stats} />
			<p>Stats</p>
		</div>
	);
}
