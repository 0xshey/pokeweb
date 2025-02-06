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

	if (statValue === null) return 0;

	return nature ? applyNature(type, statValue, nature) : statValue;
}

function getStatTierColor(value: number, type: "base" | "actual" = "base") {
	const ranges = [
        { min: 0, max: 39, label: 'Very low', background: 'bg-red-500'  },
        { min: 40, max: 64, label: 'Low', background: 'bg-orange-500'  },
        { min: 65, max: 79, label: 'Average', background: 'bg-yellow-500'  },
        { min: 80, max: 89, label: 'Decent', background: 'bg-lime-500'  },
        { min: 90, max: 109, label: 'Good', background: 'bg-green-500'  },
        { min: 110, max: 129, label: 'Great', background: 'bg-emerald-500'  },
        { min: 130, max: 149, label: 'Excellent', background: 'bg-cyan-500'  },
        { min: 150, max: 255, label: 'Top tier', background: 'bg-violet-500'  },
    ];
    
	let result = { label: 'Unknown', background: 'bg-white' };
	const modifier = type == "actual" ? 3 : 1
    
    for (const range of ranges) {
        if (value >= range.min * modifier && value <= range.max * modifier) {
            result = range;
            break;
        }
    }
}

export { calculateStat, getStatTierColor }