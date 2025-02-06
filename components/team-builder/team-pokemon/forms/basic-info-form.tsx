"use client";
import type { Pokemon } from "@/lib/pokeapi-types";

import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import types from "@/data/types.json";

export default function BasicInfoForm({
	form,
	pokemon,
}: {
	form: any;
	pokemon: Pokemon;
}) {
	return (
		<Form {...form}>
			<div className="w-full flex flex-col gap-2">
				{/* Level */}
				<FormField
					control={form.control}
					name="level"
					render={({ field }) => (
						<FormItem>
							<div className="w-fit flex flex-col gap-1 col-span-1">
								<FormLabel>
									<p className="text-[0.5rem] tracking-wider text-muted-foreground uppercase pl-0.5">
										Level
									</p>
								</FormLabel>
								<FormControl>
									<input
										type="number"
										className="w-full text-xs px-2 py-1 rounded-md border border-input bg-transparent shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
										min={1}
										max={100}
										value={field.value}
										onChange={field.onChange}
									/>
								</FormControl>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="gender"
					render={({ field }) => (
						<FormItem>
							<div className="w-full flex flex-col items-start gap-1">
								<FormLabel>
									<p className="text-[0.5rem] tracking-wider text-muted-foreground uppercase pl-0.5">
										Gender
									</p>
								</FormLabel>
								<FormControl>
									<ToggleGroup
										type="single"
										variant="outline"
										value={field.value}
										onValueChange={field.onChange}
									>
										<ToggleGroupItem
											value="male"
											className="h-6 aspect-square text-xs"
										>
											M
										</ToggleGroupItem>
										<ToggleGroupItem
											value="female"
											className="h-6 aspect-square text-xs"
										>
											F
										</ToggleGroupItem>
									</ToggleGroup>
								</FormControl>
							</div>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="shiny"
					render={({ field }) => (
						<FormItem>
							<div className="w-full flex flex-col gap-1">
								<FormLabel className="pr-3">
									<p className="text-[0.5rem] tracking-wider text-muted-foreground uppercase pl-0.5">
										Shiny?
									</p>
								</FormLabel>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										className="m-1"
									/>
								</FormControl>
							</div>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="teraType"
					render={({ field }) => (
						<FormItem>
							<div className="w-fit flex flex-col gap-1">
								<FormLabel className="pr-3">
									<p className="text-[0.5rem] tracking-wider text-muted-foreground uppercase pl-0.5">
										Tera
									</p>
								</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger className="w-full max-h-7 text-xs">
											<SelectValue placeholder="Tera" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{types.map((type) => (
													<SelectItem
														key={type.name}
														value={type.name}
													>
														{type.name}
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
			</div>
		</Form>
	);
}
