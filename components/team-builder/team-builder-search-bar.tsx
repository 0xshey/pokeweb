"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

// import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { TypeChip } from "@/components/pokedex/type";
import pokemon from "@/data/pokemon.json";

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
	handleClickResult,
}: {
	handleClickResult: (p: any) => void;
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

	return (
		<div className="w-full relative">
			<Input
				type="search"
				placeholder="Search Pokemon..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			{results.length > 0 && (
				<div className="absolute z-10 w-full bg-background border rounded-md shadow-md mt-2 overflow-y-auto">
					{sortResults(results, searchTerm)
						.slice(0, 20)
						.map((p: any) => (
							// RESULT
							<div
								key={p.id}
								className="p-2 hover:bg-muted/50 cursor-pointer flex items-center gap-4 justify-between"
								onClick={() => handleClickResult(p.name)}
							>
								<div className="flex items-center gap-2">
									<Image
										src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
										width={64}
										height={64}
										alt={p.name}
										className="aspect-square"
										loading="lazy"
									/>
									<p className="text-lg font-medium">
										{p.name
											.split("-")
											.map(
												(part: string) =>
													part
														.charAt(0)
														.toUpperCase() +
													part.slice(1)
											)
											.join(" ")}{" "}
									</p>
								</div>
								<div className="flex items-center gap-2">
									{p.types.map((type: string) => (
										<TypeChip
											key={type.id}
											type={type.type_name}
											size="sm"
										/>
									))}
								</div>
							</div>
						))}
				</div>
			)}
		</div>
	);
}
