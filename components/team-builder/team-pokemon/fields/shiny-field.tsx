import {
	FormDescription,
	FormItem,
	FormLabel,
	FormControl,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface ShinyFieldProps {
	value: boolean;
	onChange: (value: boolean) => void;
}

export default function ShinyField({ value, onChange }: ShinyFieldProps) {
	return (
		<FormItem className="">
			<FormLabel>Shiny</FormLabel>
			<div className="flex flex-row items-start space-x-3 space-y-0">
				<FormDescription>Is this pokemon Shiny?</FormDescription>
				<FormControl>
					<Checkbox checked={value} onCheckedChange={onChange} />
				</FormControl>
			</div>
		</FormItem>
	);
}
