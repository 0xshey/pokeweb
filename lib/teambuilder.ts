import { Team, TeamPokemon } from '@/lib/types';

export function parseTeam(text: string): Team {
    const team: Team = {	id: 1, slots: [] };
    const pokemonBlocks = text.split(/\n\s*\n/).map(block => block.trim());

    pokemonBlocks.forEach(block => {
        const lines = block.split("\n").map(line => line.trim());
        if (!lines.length) return;

        const firstLine = lines.shift()!;
        const [pokemonName, item] = firstLine.includes("@") 
            ? firstLine.split(" @ ").map(s => s.trim())
            : [firstLine.trim(), ""];

        const abilityLine = lines.find(line => line.startsWith("Ability:")) || "";
        const ability = abilityLine.replace("Ability:", "").trim();

        const evLine = lines.find(line => line.startsWith("EVs:")) || "";
        const evs = parseStatLine(evLine.replace("EVs:", "").trim(), 0);

        const ivLine = lines.find(line => line.startsWith("IVs:")) || "";
        const ivs = parseStatLine(ivLine.replace("IVs:", "").trim(), 31);

        const natureLine = lines.find(line => line.includes("Nature")) || "";
        const nature = natureLine.replace("Nature", "").trim();

        const moves = lines.filter(line => line.startsWith("-")).map(line => line.replace("-", "").trim());
        const isMega = pokemonName.includes("-Mega") || item.includes("ite");

        team.slots.push({
            pokemon: pokemonName.replace(/ \(M\)| \(F\)/g, "").trim(),
            heldItem: item,
            ability: ability,
            nature: nature,
            evs: evs,
            ivs: ivs,
            moves: {
                1: moves[0] || "",
                2: moves[1] || "",
                3: moves[2] || "",
                4: moves[3] || "",
            },
            isMega: isMega,
            level: 50, // default level
        });
    });

    return team;
}

function parseStatLine(statLine: string, defaultValue: number): { hp: number; atk: number; def: number; spa: number; spd: number; spe: number } {
    const stats = { hp: defaultValue, atk: defaultValue, def: defaultValue, spa: defaultValue, spd: defaultValue, spe: defaultValue };
    const statMap: Record<string, keyof typeof stats> = {
        HP: "hp",
        Atk: "atk",
        Def: "def",
        SpA: "spa",
        SpD: "spd",
        Spe: "spe",
    };

    statLine.split("/").forEach(statPart => {
        const [value, stat] = statPart.trim().split(" ");
        if (stat && statMap[stat]) {
            stats[statMap[stat]] = parseInt(value, 10) || defaultValue;
        }
    });

    return stats;
}