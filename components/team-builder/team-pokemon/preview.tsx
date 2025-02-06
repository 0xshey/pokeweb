import Image from "next/image";

import { StarIcon } from "@radix-ui/react-icons";
import { calculateStat } from "@/lib/formulae";
import statAbbreviations from "@/data/extra/stat-abbreviations.json";

import { FormTypePokemon } from "@/components/team-builder/team-pokemon/forms";

interface TeamPokemonPreviewProps {
	pokemon: any;
	data: FormTypePokemon;
}

export default function TeamPokemonPreview({
	pokemon,
	data,
}: TeamPokemonPreviewProps) {
	return (
		<div className="bg-muted px-4 py-2 pb-8 mt-4 rounded-lg">
			<div className="w-full flex justify-between">
				<div className="flex items-center gap-6 text-muted-foreground">
					<p className="text-lg font-bold capitalize tracking-wide">
						{pokemon.name}
					</p>
					<p className="text-xs">Lv. {data.level}</p>
					{data.shiny && <StarIcon className="w-4 h-4" />}
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
				{/* <pre className="max-h-80 overflow-y-scroll no-scrollbar">
					{JSON.stringify(data, null, 2)}
				</pre> */}

				<Image
					src={
						pokemon.sprites.other["official-artwork"][
							data.shiny ? "front_shiny" : "front_default"
						]
					}
					alt={pokemon.name}
					height={240}
					width={240}

					// layout="cover"
				/>
			</div>
			<div className="grid grid-cols-6">
				{[
					"hp",
					"attack",
					"defense",
					"special-attack",
					"special-defense",
					"speed",
				].map((statName) => (
					<div key={statName} className="flex flex-col items-center">
						<p className="text-xs">
							{statAbbreviations[statName].toLowerCase()}
							IV ={" "}
							{
								data.ivs[
									statAbbreviations[statName].toLowerCase()
								]
							}
						</p>
						<p className="font-bold">
							{calculateStat(
								statName,
								Math.floor(
									pokemon.stats.find(
										(stat: any) =>
											stat.stat.name === statName
									).base_stat
								),
								data.ivs[
									statAbbreviations[statName].toLowerCase()
								] || 0,
								252,
								Math.floor(data.level),
								data.nature
							)}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
