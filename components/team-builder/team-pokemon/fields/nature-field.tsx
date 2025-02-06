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
import { NatureChip } from "@/components/pokedex/nature";

import natures from "@/data/natures.json";

export default function NatureField({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string | null) => void;
}) {
	return (
		<FormItem>
			<FormLabel>Nature</FormLabel>
			{/* <Input {...field} /> */}
			<FormControl>
				<Popover>
					<PopoverTrigger asChild className="block w-full">
						<Button
							variant="outline"
							role="combobox"
							className={cn(
								"justify-between px-2 py-0",
								!value && "text-muted-foreground w-full"
							)}
						>
							{value ? (
								<div className="w-full flex">
									<NatureChip
										nature={value}
										orientation="horizontal"
									/>
								</div>
							) : (
								"None"
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-2 w-[80vw] m-2" side="top">
						<div className="grid grid-cols-5 gap-2">
							{natures.map((nature) => (
								<div
									onClick={() => onChange(nature.name)}
									className="cursor-pointer col-span-1 aspect-square"
								>
									<div className="flex">
										<NatureChip nature={nature.name} />
									</div>
								</div>
							))}
							<div
								onClick={() => onChange(null)}
								className="cursor-pointer col-span-5"
							>
								<div className="border flex items-center justify-center py-1 rounded text-sm bg-muted text-muted-foreground">
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
