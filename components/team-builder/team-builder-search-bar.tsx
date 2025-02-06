"use client";
import { useState, useEffect } from "react";

// import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import pokemon from "@/data/pokemon.json";
import PokemonSimpleCard from "../pokedex/pokemon/simple-card";

function searchAlgorithm(searchTerm: string, items: any[], searchKey: string) {
	return items.filter((item: any) =>
		item[searchKey].toLowerCase().includes(searchTerm.toLowerCase())
	);
}

function sortResults(results: any[], searchTerm: string) {
	return results.sort((a, b) => {
		const indexA = a.name.toLowerCase().indexOf(searchTerm.toLowerCase());
		const indexB = b.name.toLowerCase().indexOf(searchTerm.toLowerCase());
		return indexA - indexB;
	});
}

export default function TeamBuilderSearchBar({
	handlePokemonResult,
}: {
	handlePokemonResult: (p: any) => void;
}) {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [results, setResults] = useState<any[]>([]);

	useEffect(() => {
		if (searchTerm.trim() !== "") {
			const filtered = searchAlgorithm(searchTerm, pokemon, "name");
			setResults(filtered);
		} else {
			setResults([]);
		}
	}, [searchTerm]);

	function handleClickResult(pokemonId: string) {
		handlePokemonResult(pokemonId);
		setSearchTerm("");
	}

	return (
		<div className="w-full relative">
			<Input
				type="search"
				placeholder="Search Pokemon..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="max-w-lg mx-auto"
			/>
			{results.length > 0 && (
				<div className="absolute z-10 w-full bg-background rounded-md shadow-md mt-2 overflow-y-auto flex flex-col gap-2">
					{sortResults(results, searchTerm)
						.slice(0, 20)
						.map((p: any) => (
							<div onClick={(e) => handleClickResult(p.id)}>
								<PokemonSimpleCard id={p.id} />
							</div>
						))}
				</div>
			)}
		</div>
	);
}
