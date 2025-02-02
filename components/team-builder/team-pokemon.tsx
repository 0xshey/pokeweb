"use client";
import Image from "next/image";

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import TeamPokemonEditor from "@/components/team-builder/team-pokemon-editor/editor";

// import { TeamPokemon as TeamPokemonType } from "@/lib/types";

export default function TeamPokemon({ pokemon }: { pokemon: any }) {
	return (
		<div className="w-full border rounded p-2">
			<Drawer>
				<DrawerTrigger>
					{/* Pokemon Tile */}
					<div className="grid grid-cols-5">
						<div className="col-span-1">
							<Image
								src={
									pokemon.sprites.other["official-artwork"][
										"front_default"
									]
								}
								alt={pokemon.name}
								width={110}
								height={110}
								quality={100}
							/>
						</div>
						<div className="col-span-3 flex items-center p-2">
							<p className="text-lg capitalize">{pokemon.name}</p>
						</div>
					</div>
				</DrawerTrigger>
				<DrawerContent>
					<div className="w-full px-4 max-h-[calc(80vh)] overflow-y-scroll">
						<TeamPokemonEditor pokemon={pokemon} />
					</div>

					<DrawerFooter></DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
}
