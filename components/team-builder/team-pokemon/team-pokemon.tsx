"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import type { Pokemon } from "@/lib/pokeapi-types";
import P from "@/lib/pokeapi";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import StatsChart from "@/components/stats/stats-chart";

import { usePokemonForm } from "./forms";
import BasicInfoForm from "./forms/basic-info-form";
import ModifierInfoForm from "./forms/modifier-info-form";
import MovesForm from "./forms/moves-form";
import StatsForm from "./forms/stats-form";

import { TypeChip } from "@/components/pokedex/type";
import { StarIcon } from "@radix-ui/react-icons";

export default function TeamPokemonCard({ pokemon }: { pokemon: any }) {
	const form = usePokemonForm();

	return (
		<div className="w-full grid grid-cols-3 items-center border rounded-lg px-2 py-2 gap-4 mt-8">
			<div className="w-full col-span-3 flex justify-center relative h-full min-h-32 ">
				<h2 className="backdrop-blur rounded-md px-2 absolute top-1 left-1 flex items-center gap-2">
					<p className="text-base md:text-2xl capitalize font-bold font-mono">
						{pokemon.name}
					</p>
					{form.watch().shiny && <StarIcon className="w-4 h-4" />}
				</h2>
				<div className="flex gap-1 absolute top-1 xl:-top-12 right-1">
					{pokemon.types.map(({ type }: { type: any }) => (
						<TypeChip type={type.name} size="icon" />
						// <p>{type.name}</p>
					))}
				</div>
				<Image
					src={
						pokemon.sprites.other["official-artwork"][
							form.watch().shiny ? "front_shiny" : "front_default"
						]
					}
					alt={pokemon.name}
					width={180}
					height={180}
					className="absolute inset-0 -translate-y-1/4 mx-auto "
				/>
			</div>
			<div className="w-full h-full col-span-3 grid grid-cols-3 justify-between gap-4">
				<BasicInfoForm form={form} pokemon={pokemon} />
				<ModifierInfoForm form={form} pokemon={pokemon} />
				<MovesForm form={form} pokemon={pokemon} />
			</div>
			<div className="col-span-1 flex flex-col justify-between gap-2"></div>

			<div className="col-span-3">
				<StatsForm form={form} pokemon={pokemon} />
			</div>
			{/* Preview */}
			{/* <div className="col-span-9 flex flex-col justify-between gap-2">
				<pre>{JSON.stringify(form.watch(), null, 2)}</pre>
			</div> */}
		</div>
	);
}
