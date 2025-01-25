// Stat calculation formulae

// Gen III+ Stat calculation formulae

function calculateHPStat(base: number, iv: number, ev: number, level: number) {
  return Math.floor(((base * 2 + iv + Math.floor(ev / 4)) * level) / 100 + level + 10);
}

function calculateOtherStat(base: number, iv: number, ev: number, level: number) {
  return Math.floor(((base * 2 + iv + Math.floor(ev / 4)) * level) / 100 + 5);
}

function calculateStat(type: string, base: number, iv: number, ev: number, level: number) {
return type === "hp"
	? calculateHPStat(base, iv, ev, level)
	: ["attack", "defense", "special-attack", "special-defense", "speed"].includes(type)
	? calculateOtherStat(base, iv, ev, level)
	: null;
}

export { calculateStat };