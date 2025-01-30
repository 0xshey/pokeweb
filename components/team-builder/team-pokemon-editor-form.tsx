"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
	nickname: z.string().nonempty(),
	level: z.number().int().min(1).max(100),
	teraType: z.string().nonempty(),
	shiny: z.boolean(),

	nature: z.string().nonempty(),
	ability: z.string().nonempty(),
	heldItem: z.string(),
	moves: z.object({
		1: z.string(),
		2: z.string(),
		3: z.string(),
		4: z.string(),
	}),
	evs: z.object({
		hp: z.number().int().min(0).max(252),
		atk: z.number().int().min(0).max(252),
		def: z.number().int().min(0).max(252),
		spa: z.number().int().min(0).max(252),
		spd: z.number().int().min(0).max(252),
		spe: z.number().int().min(0).max(252),
	}),

	ivs: z.object({
		hp: z.number().int().min(0).max(31),
		atk: z.number().int().min(0).max(31),
		def: z.number().int().min(0).max(31),
		spa: z.number().int().min(0).max(31),
		spd: z.number().int().min(0).max(31),
		spe: z.number().int().min(0).max(31),
	}),

	isMega: z.boolean(),
});

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

				{/* Tera Type */}
				<FormField
					control={form.control}
					name="teraType"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tera Type</FormLabel>
							<Input {...field} />
							<FormDescription>
								Specify the Tera Type of your Pokemon
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>

				{/* Shiny */}
				<FormField
					control={form.control}
					name="shiny"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Shiny</FormLabel>
							<Checkbox {...field} />
							<FormDescription>
								Is your Pokemon shiny?
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>

				{/* Nature */}
				<FormField
					control={form.control}
					name="nature"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nature</FormLabel>
							<Input {...field} />
							<FormDescription>
								Specify the nature of your Pokemon
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>

				{/* Ability */}
				<FormField
					control={form.control}
					name="ability"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ability</FormLabel>
							<Input {...field} />
							<FormDescription>
								Specify the ability of your Pokemon
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>

				{/* Held Item */}
				<FormField
					control={form.control}
					name="heldItem"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Held Item</FormLabel>
							<Input {...field} />
							<FormDescription>
								Specify the held item of your Pokemon
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>

				{/* Moves */}

				{/* EVs */}
				<FormField
					control={form.control}
					name="evs.hp"
					render={({ field }) => (
						<FormItem>
							<FormLabel>EV HP</FormLabel>
							<Input type="number" {...field} />
							<FormDescription>
								Specify the HP EVs of your Pokemon (0-252)
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="evs.atk"
					render={({ field }) => (
						<FormItem>
							<FormLabel>EV Attack</FormLabel>
							<Input type="number" {...field} />
							<FormDescription>
								Specify the Attack EVs of your Pokemon (0-252)
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="evs.def"
					render={({ field }) => (
						<FormItem>
							<FormLabel>EV Defense</FormLabel>
							<Input type="number" {...field} />
							<FormDescription>
								Specify the Defense EVs of your Pokemon (0-252)
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="evs.spa"
					render={({ field }) => (
						<FormItem>
							<FormLabel>EV Special Attack</FormLabel>
							<Input type="number" {...field} />
							<FormDescription>
								Specify the Special Attack EVs of your Pokemon
								(0-252)
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="evs.spd"
					render={({ field }) => (
						<FormItem>
							<FormLabel>EV Special Defense</FormLabel>
							<Input type="number" {...field} />
							<FormDescription>
								Specify the Special Defense EVs of your Pokemon
								(0-252)
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="evs.spe"
					render={({ field }) => (
						<FormItem>
							<FormLabel>EV Speed</FormLabel>
							<Input type="number" {...field} />
							<FormDescription>
								Specify the Speed EVs of your Pokemon (0-252)
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>

				{/* IVs */}
				<FormField
					control={form.control}
					name="ivs.hp"
					render={({ field }) => (
						<FormItem>
							<FormLabel>IV HP</FormLabel>
							<Input type="number" {...field} />
							<FormDescription>
								Specify the HP IVs of your Pokemon (0-31)
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="ivs.atk"
					render={({ field }) => (
						<FormItem>
							<FormLabel>IV Attack</FormLabel>
							<Input type="number" {...field} />
							<FormDescription>
								Specify the Attack IVs of your Pokemon (0-31)
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="ivs.def"
					render={({ field }) => (
						<FormItem>
							<FormLabel>IV Defense</FormLabel>
							<Input type="number" {...field} />
							<FormDescription>
								Specify the Defense IVs of your Pokemon (0-31)
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="ivs.spa"
					render={({ field }) => (
						<FormItem>
							<FormLabel>IV Special Attack</FormLabel>
							<Input type="number" {...field} />
							<FormDescription>
								Specify the Special Attack IVs of your Pokemon
								(0-31)
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="ivs.spd"
					render={({ field }) => (
						<FormItem>
							<FormLabel>IV Special Defense</FormLabel>
							<Input type="number" {...field} />
							<FormDescription>
								Specify the Special Defense IVs of your Pokemon
								(0-31)
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="ivs.spe"
					render={({ field }) => (
						<FormItem>
							<FormLabel>IV Speed</FormLabel>
							<Input type="number" {...field} />
							<FormDescription>
								Specify the Speed IVs of your Pokemon (0-31)
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>

				{/* Is Mega */}
				<FormField
					control={form.control}
					name="isMega"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Is Mega</FormLabel>
							<Checkbox {...field} />
							<FormDescription>
								Is your Pokemon a Mega Evolution?
							</FormDescription>
							<FormMessage {...field} />
						</FormItem>
					)}
				/>

				<Button type="submit">Save</Button>
			</form>
		</Form>
	);
}
