import PokemonSpecies from "@/components/pokedex/pokemon-species";

export default async function DexSpeciesPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return (
		<div className="w-full max-w-4xl flex flex-col items-center mx-auto mt-16">
			<PokemonSpecies id={params.id} />
		</div>
	);
}
