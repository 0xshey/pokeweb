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
import TeamPokemonEditorForm from "@/components/team-builder/team-pokemon-editor-form";

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
								src={pokemon.sprites.front_default}
								alt={pokemon.name}
								width={96}
								height={96}
							/>
						</div>
						<div className="col-span-3 bg-red-500 flex items-center p-2">
							<p className="text-lg capitalize">{pokemon.name}</p>
						</div>
						<div className="col-span-1">
							<Button variant="outline">Edit</Button>
						</div>
					</div>
				</DrawerTrigger>
				<DrawerContent>
					{/* Pokemon Editor */}
					<DrawerHeader>
						<DrawerTitle>
							Edit{" "}
							<span className="capitalize">{pokemon.name}</span>
						</DrawerTitle>
						<DrawerDescription>
							This is the description
						</DrawerDescription>
					</DrawerHeader>

					<div className="w-full px-4 max-h-[calc(80vh)] overflow-y-scroll">
						<TeamPokemonEditorForm pokemon={pokemon} />
					</div>

					{/* <ul>
						<li>KEYS:</li>
						{Object.keys(pokemon).map((key) => (
							<li key={key}>{key}</li>
						))}
					</ul> */}

					<DrawerFooter>
						<Button>Submit</Button>
						<DrawerClose>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
}
