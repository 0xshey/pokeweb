import {
	FormDescription,
	FormItem,
	FormLabel,
	FormControl,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface AbilityFieldProps {
	value: string;
	onChange: (value: string) => void;
	potentialAbilities: { ability: { name: string } }[];
}

export default function AbilityField({
	value,
	onChange,
	potentialAbilities,
}: AbilityFieldProps) {
	return (
		<FormItem>
			<FormLabel>Ability</FormLabel>

			<Select onValueChange={onChange} defaultValue={value}>
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

			<FormDescription>
				Set the ability of your Pokemon: {value}
			</FormDescription>
			{/* <FormMessage {...field} /> */}
		</FormItem>
	);
}
