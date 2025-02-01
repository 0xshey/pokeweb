import {
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

interface LevelFieldProps {
	value: number;
	onChange: (value: number[]) => void;
}

export default function LevelField({ value, onChange }: LevelFieldProps) {
	return (
		<FormItem>
			<FormLabel>Level</FormLabel>
			{/* <Input type="number" {...field} /> */}
			<Slider
				min={1}
				step={1}
				max={100}
				defaultValue={[value]}
				onValueChange={onChange}
			/>
			<FormDescription>
				Set the level of your Pokemon (1-100) {[value]}
			</FormDescription>
			{/* <FormMessage content={[value]} /> */}
		</FormItem>
	);
}
