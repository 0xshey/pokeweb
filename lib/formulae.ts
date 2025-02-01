// Gen III+ Stat calculation formulae
import natures from "@/data/natures.json";

function calculateHPStat(base: number, iv: number, ev: number, level: number): number {
	return Math.floor(((base * 2 + iv + Math.floor(ev / 4)) * level) / 100 + level + 10);
}

function calculateOtherStat(base: number, iv: number, ev: number, level: number, nature?: string): number {
	return Math.floor(((base * 2 + iv + Math.floor(ev / 4)) * level) / 100 + 5);
	
}

function applyNature(stat: string, value: number, nature: string): number {
	const natureData = natures.find((n) => n.name === nature);
	if (!natureData) return value;

	const modifier = natureData.increased === stat ? 1.1 : natureData.decreased === stat ? 0.9 : 1;
	return Math.floor(value * modifier);
}


function calculateStat(type: string, base: number, iv: number, ev: number, level: number, nature?: string): number | null {
	const statValue = type === "hp"
		? calculateHPStat(base, iv, ev, level)
		: ["attack", "defense", "special-attack", "special-defense", "speed"].includes(type)
		? calculateOtherStat(base, iv, ev, level, type)
		: null;

	if (statValue === null) return null;

	return nature ? applyNature(type, statValue, nature) : statValue;
}

export { calculateStat }