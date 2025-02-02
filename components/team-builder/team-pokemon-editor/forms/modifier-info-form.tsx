"use client";
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

import natures from "@/data/natures.json";

export default function ModifierInfoForm({
	form,
	potentialAbilities,
}: {
	form: any;
	potentialAbilities: any;
}) {
	return (
		<Form {...form}>
			<FormField
				control={form.control}
				name="nature"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Nature</FormLabel>
						<FormControl>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<SelectTrigger>
									<SelectValue placeholder="Choose nature" />
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
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="ability"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Ability</FormLabel>

						<Select
							onValueChange={field.onChange}
							defaultValue={potentialAbilities[0].ability.name}
						>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Choose ability" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{potentialAbilities.map((ability: any) => (
									<SelectItem
										key={ability.ability.name}
										value={ability.ability.name}
									>
										{ability.ability.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormItem>
				)}
			/>
		</Form>
	);
}
