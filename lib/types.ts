// Team Builder Types
export type TeamPokemon = {
	pokemon: string;
	heldItem: string;
	ability: string;
	nature: string;
	evs: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number };
	ivs: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number };
	moves: {
		1: string;
		2: string;
		3: string;
		4: string;
	}
	isMega: boolean;
	level?: number; // default to 50 in calculations
};

export type Team = {
	id: number;
	slots: [TeamPokemon];
};
