"use client";
import type { Pokemon } from "@/lib/pokeapi-types";

import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormLabel,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import natures from "@/data/natures.json";

export default function ModifierInfoForm({
	form,
	pokemon,
}: {
	form: any;
	pokemon: Pokemon;
}) {
	return (
		<Form {...form}>
			<div className="w-full flex flex-col gap-2">
				{/* Nature */}
				<FormField
					control={form.control}
					name="nature"
					render={({ field }) => (
						<FormItem>
							<div className="w-full flex flex-col gap-1">
								<FormLabel className="pr-3">
									<p className="text-[0.5rem] tracking-wider text-muted-foreground uppercase pl-0.5">
										Nature
									</p>
								</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger className="w-full max-h-7 text-xs">
											<SelectValue placeholder="Nature" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{natures.map((nature) => (
													<SelectItem
														key={nature.name}
														value={nature.name}
													>
														{nature.name}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormControl>
							</div>
						</FormItem>
					)}
				/>

				{/* Ability */}
				<FormField
					control={form.control}
					name="ability"
					render={({ field }) => (
						<FormItem>
							<div className="w-full flex flex-col gap-1">
								<FormLabel className="pr-3">
									<p className="text-[0.5rem] tracking-wider text-muted-foreground uppercase pl-0.5">
										Ability
									</p>
								</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger className="w-full max-h-7 text-xs">
											<SelectValue placeholder="Nature" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{pokemon.abilities.map(
													({ ability }) => (
														<SelectItem
															key={ability.name}
															value={ability.name}
														>
															{ability.name}
														</SelectItem>
													)
												)}
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormControl>
							</div>
						</FormItem>
					)}
				/>

				{/* Item */}
				<FormField
					control={form.control}
					name="item"
					render={({ field }) => (
						<FormItem>
							<div className="w-full flex flex-col gap-1">
								<FormLabel className="pr-3">
									<p className="text-[0.5rem] tracking-wider text-muted-foreground uppercase pl-0.5">
										Item
									</p>
								</FormLabel>
								<FormControl>
									<Select
										disabled
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger className="w-full max-h-7 text-xs">
											<SelectValue placeholder="Item" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{/* Put SelectItem's Here */}
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormControl>
							</div>
						</FormItem>
					)}
				/>
			</div>
		</Form>
	);
}
