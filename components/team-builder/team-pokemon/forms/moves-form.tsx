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

export default function MovesForm({
	form,
	pokemon,
}: {
	form: any;
	pokemon: Pokemon;
}) {
	return (
		<Form {...form}>
			<div className="w-full flex flex-col gap-2">
				<FormLabel>
					<p className="text-[0.5rem] tracking-wider text-muted-foreground uppercase pl-0.5">
						Moves
					</p>
				</FormLabel>
				{/* Move 1 */}
				<FormField
					control={form.control}
					name="moves.1"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className="w-full max-h-7 text-xs">
										<SelectValue placeholder="Move" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{pokemon.moves.map((move) => (
												<SelectItem
													key={move.move.name}
													value={move.move.name}
												>
													{move.move.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
				{/* Move 2 */}
				<FormField
					control={form.control}
					name="moves.2"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className="w-full max-h-7 text-xs">
										<SelectValue placeholder="Move" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{pokemon.moves.map((move) => (
												<SelectItem
													key={move.move.name}
													value={move.move.name}
												>
													{move.move.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
				{/* Move 3 */}
				<FormField
					control={form.control}
					name="moves.3"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className="w-full max-h-7 text-xs">
										<SelectValue placeholder="Move" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{pokemon.moves.map((move) => (
												<SelectItem
													key={move.move.name}
													value={move.move.name}
												>
													{move.move.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
				{/* Move 4 */}
				<FormField
					control={form.control}
					name="moves.4"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className="w-full max-h-7 text-xs">
										<SelectValue placeholder="Move" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{pokemon.moves.map((move) => (
												<SelectItem
													key={move.move.name}
													value={move.move.name}
												>
													{move.move.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
			</div>
		</Form>
	);
}
