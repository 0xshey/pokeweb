import Head from "next/head";

type MetaProviderProps = {
	title?: string;
	description?: string;
};

export default function MetaProvider({
	title = "Poke Web",
	description = "A pokemon team builder and data viewer",
}: MetaProviderProps) {
	return (
		<>
			<Head>
				<title>PokeWeb</title>

				<meta name="title" key="title" content={title} />
				<meta
					name="description"
					key="description"
					content={description}
				/>
			</Head>
		</>
	);
}
