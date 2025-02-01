import { z } from "zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Schemas
const pokemonFormSchema = z.object({
	nickname: z.string().nullable(),
	level: z.number().int().min(1).max(100),
	gender: z.string().nullable(),
	teraType: z.string().nullable(),
	shiny: z.boolean(),

	nature: z.string().nullable(),
	ability: z.string().nullable(),
	heldItem: z.string().nullable(),

	moves: z.object({
		1: z.string().nullable(),
		2: z.string().nullable(),
		3: z.string().nullable(),
		4: z.string().nullable(),
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
});

// Hooks
export type FormTypePokemon = z.infer<typeof pokemonFormSchema>;

export function usePokemonForm() {
	return useForm<FormTypePokemon>({
		resolver: zodResolver(pokemonFormSchema),
		defaultValues: {
			nickname: null,
			level: 1,
			gender: null,
			teraType: null,
			shiny: false,
			nature: null,
			ability: null,
			heldItem: null,
			moves: {
				1: null,
				2: null,
				3: null,
				4: null,
			},
			evs: {
				hp: 0,
				atk: 0,
				def: 0,
				spa: 0,
				spd: 0,
				spe: 0,
			},
			ivs: {
				hp: 0,
				atk: 0,
				def: 0,
				spa: 0,
				spd: 0,
				spe: 0,
			},
		},
	});
}

// Context
export function PokemonFormProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const form = usePokemonForm();
	return <FormProvider {...form}>{children}</FormProvider>;
}

export function usePokemonFormContext() {
	return useFormContext<FormTypePokemon>();
}
