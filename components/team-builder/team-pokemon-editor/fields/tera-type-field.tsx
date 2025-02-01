"use client";
import { cn } from "@/lib/utils";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TypeChip } from "@/components/pokedex/type";

import types from "@/data/types.json";
import { set } from "react-hook-form";

export default function TeraTypeField({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string | null) => void;
}) {
	return (
		<FormItem>
			<FormLabel>Tera Type</FormLabel>
			{/* <Input {...field} /> */}
			<FormControl>
				<Popover>
					<PopoverTrigger asChild className="block w-full">
						<Button
							variant="outline"
							role="combobox"
							className={cn(
								"justify-between px-2",
								!value && "text-muted-foreground w-full"
							)}
						>
							{value ? (
								<TypeChip
									type={
										types.find((t) => t.name === value)
											?.name
									}
									size="sm"
								/>
							) : (
								"None"
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-2 w-[80vw] m-2" side="top">
						<div className="grid grid-cols-2 gap-2">
							{types.map((type) => (
								<div
									onClick={() => onChange(type.name)}
									className="cursor-pointer"
								>
									<TypeChip
										key={type.name}
										type={type.name}
										size="sm"
									/>
								</div>
							))}
							<div
								onClick={() => onChange(null)}
								className="cursor-pointer col-span-2"
							>
								<div className="col-span-2 border flex items-center justify-center py-1 rounded text-sm bg-muted text-muted-foreground">
									None
								</div>
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</FormControl>
			{/* <FormDescription>
				Specify the Tera Type of your Pokemon
			</FormDescription> */}
			<FormMessage />
		</FormItem>
	);
}
