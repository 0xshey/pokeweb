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
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function MovesForm({
	form,
	potentialMoves,
}: {
	form: any;
	potentialMoves: any;
}) {
	return (
		<Form {...form}>
			<div className="grid grid-cols-2 gap-4">
				{[1, 2, 3, 4].map((index) => (
					<FormField
						key={index}
						control={form.control}
						name={`moves.${index}`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Move {index}</FormLabel>
								<div className="flex items-center gap-2">
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger>
												<SelectValue
													placeholder={`Choose move ${index}`}
												/>
											</SelectTrigger>
											<SelectContent>
												{potentialMoves.map((move) => (
													<SelectItem
														key={move.move.name}
														value={move.move.name}
													>
														{move.move.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									{/* <Button
										size="icon"
										variant="ghost"
										disabled={!field.value}
										onClick={() =>
											form.setValue(
												`moves.${index}`,
												null
											)
										}
									>
										<Cross2Icon />
									</Button> */}
								</div>
							</FormItem>
						)}
					/>
				))}
			</div>
		</Form>
	);
}
