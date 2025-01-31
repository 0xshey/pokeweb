"use client";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StarIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import formSchema from "./schema";
import TeraTypeField from "./tera-type-field";
import NatureField from "./nature-field";

import { calculateStat } from "@/lib/formulae";
import statAbbreviations from "@/data/extra/stat-abbreviations.json";
import { Star } from "lucide-react";

export default function TeamPokemonEditorForm({ pokemon }: { pokemon: any }) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nickname: pokemon.nickname || "",
			level: pokemon.level || 1,
			teraType: pokemon.teraType || "",
			shiny: pokemon.shiny || false,
			nature: pokemon.nature || "",
			ability: pokemon.ability || "",
			heldItem: pokemon.heldItem || "",
			moves: {
				1: pokemon.moves?.[1] || "",
				2: pokemon.moves?.[2] || "",
				3: pokemon.moves?.[3] || "",
				4: pokemon.moves?.[4] || "",
			},
			evs: {
				hp: pokemon.evs?.hp || 0,
				atk: pokemon.evs?.atk || 0,
				def: pokemon.evs?.def || 0,
				spa: pokemon.evs?.spa || 0,
				spd: pokemon.evs?.spd || 0,
				spe: pokemon.evs?.spe || 0,
			},
			ivs: {
				hp: pokemon.ivs?.hp || 0,
				atk: pokemon.ivs?.atk || 0,
				def: pokemon.ivs?.def || 0,
				spa: pokemon.ivs?.spa || 0,
				spd: pokemon.ivs?.spd || 0,
				spe: pokemon.ivs?.spe || 0,
			},
			isMega: pokemon.isMega || false,
		},
	});

	function onSubmit(data: any) {
		console.log(data);
	}

	return (
		<Form {...form}>
			{/* Preview */}
			{/* <pre>{JSON.stringify(pokemon, null, 2)}</pre> */}
			<div className="w-full flex justify-between">
				<div className="flex items-center gap-6 text-muted-foreground">
					<p className="text-lg font-bold capitalize tracking-wide">
						{pokemon.name}
					</p>
					<p className="text-xs">Lv. {form.watch().level}</p>
					{form.watch().shiny && <StarIcon className="w-4 h-4" />}
				</div>
				<div className="flex items-center gap-2">
					{pokemon.types.map((type: any) => (
						<div key={type.type.name} className="capitalize">
							{type.type.name}
						</div>
					))}
				</div>
			</div>
			<div className="w-full flex justify-center">
				<Image
					src={
						pokemon.sprites.other["official-artwork"][
							form.watch().shiny ? "front_shiny" : "front_default"
						]
					}
					alt={pokemon.name}
					height={240}
					width={240}
					// layout="cover"
				/>
			</div>

			<div className="grid grid-cols-6 mb-16">
				{[
					"hp",
					"attack",
					"defense",
					"special-attack",
					"special-defense",
					"speed",
				].map((statName) => (
					<div key={statName} className="flex flex-col items-center">
						<p className="text-xs">{statAbbreviations[statName]}</p>
						<p className="font-bold">
							{calculateStat(
								statName,
								Math.floor(
									pokemon.stats.find(
										(stat: any) =>
											stat.stat.name === statName
									).base_stat
								),
								31,
								252,
								Math.floor(form.watch().level)
							)}
						</p>
					</div>
				))}
			</div>

			{/* Edit */}
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{/* Nickname */}
				<FormField
					control={form.control}
					name="nickname"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nickname</FormLabel>
							<Input {...field} />
							<FormDescription>
								Provide a nickname for your Pokemon
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>

				{/* Level */}
				<FormField
					control={form.control}
					name="level"
					render={({ field: { value, onChange } }) => (
						<FormItem>
							<FormLabel>Level</FormLabel>
							{/* <Input type="number" {...field} /> */}
							<Slider
								min={1}
								step={1}
								max={100}
								defaultValue={[value]}
								onValueChange={onChange}
							/>
							<FormDescription>
								Set the level of your Pokemon (1-100) {[value]}
							</FormDescription>
							{/* <FormMessage content={[value]} /> */}
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-2 gap-8">
					{/* Tera Type */}
					<FormField
						control={form.control}
						name="teraType"
						render={({ field: { value, onChange } }) => (
							<TeraTypeField value={value} onChange={onChange} />
						)}
					/>
					{/* Shiny */}
					<FormField
						control={form.control}
						name="shiny"
						render={({ field }) => (
							<FormItem className="">
								<FormLabel>Shiny</FormLabel>
								<div className="flex flex-row items-start space-x-3 space-y-0">
									<FormDescription>
										Is this pokemon Shiny?
									</FormDescription>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</div>
								<FormMessage {...field} />
							</FormItem>
						)}
					/>
				</div>

				{/* Nature */}
				<FormField
					control={form.control}
					name="nature"
					render={({ field: { value, onChange } }) => (
						<NatureField value={value} onChange={onChange} />
					)}
				/>

				{/* Ability - Toggle Group Single */}
				<FormField
					control={form.control}
					name="ability"
					render={({ field: { value, onChange } }) => (
						<FormItem>
							<FormLabel>Ability</FormLabel>

							<Select
								onValueChange={onChange}
								defaultValue={value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Choose ability" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{pokemon.abilities.map((ability: any) => (
										<SelectItem
											key={ability.ability.name}
											value={ability.ability.name}
										>
											{ability.ability.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<FormDescription>
								Set the ability of your Pokemon: {value}
							</FormDescription>
							{/* <FormMessage {...field} /> */}
						</FormItem>
					)}
				/>

				<Button type="submit">Save</Button>
			</form>
		</Form>
	);
}
