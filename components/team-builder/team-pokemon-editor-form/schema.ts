import { z } from 'zod';

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

export default formSchema;