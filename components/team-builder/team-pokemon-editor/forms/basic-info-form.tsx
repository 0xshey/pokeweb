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

import types from "@/data/types.json";

export default function BasicInfoForm({ form }: { form: any }) {
	return (
		<Form {...form}>
			<FormField
				control={form.control}
				name="nickname"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Nickname</FormLabel>
						<FormControl>
							<Input placeholder="Nickname" {...field} />
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="level"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Level {field.value}</FormLabel>
						<FormControl>
							<Slider
								min={1}
								step={1}
								max={100}
								defaultValue={[field.value]}
								onValueChange={field.onChange}
							/>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="teraType"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Select {...field}>
								<SelectTrigger>
									<SelectValue>
										{field.value || "Select Tera Type"}
									</SelectValue>
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{types.map((type) => (
											<SelectItem
												key={type.name}
												value={type.name}
											>
												<SelectLabel>
													{type.name}
												</SelectLabel>
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
				name="shiny"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="pr-3">Shiny?</FormLabel>
						<FormControl>
							<Checkbox
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
						</FormControl>
					</FormItem>
				)}
			/>
		</Form>
	);
}
