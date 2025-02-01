import { PinTopIcon, PinBottomIcon } from "@radix-ui/react-icons";

import {
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EVFieldProps {
	value: number;
	onChange: (value: number) => void;
	evName: string;
	evsMaxed: boolean;
}

export default function EVField({
	value,
	onChange,
	evName,
	evsMaxed,
}: EVFieldProps) {
	return (
		<FormItem>
			<FormLabel>{evName}</FormLabel>
			<Input
				type="number"
				min={0}
				step={1}
				max={252}
				defaultValue={value}
				onChange={(e) => onChange(parseInt(e.target.value))}
			/>
			<div className="w-full grid grid-cols-2">
				<Button variant="outline" size="icon">
					<PinBottomIcon />
				</Button>
				<Button variant="outline" size="icon">
					<PinTopIcon />
				</Button>
			</div>
			<FormDescription>
				{/* Set the level of your Pokemon (1-100) {JSON.stringify(value)} */}
			</FormDescription>
			{/* <FormMessage content={[value]} /> */}
		</FormItem>
	);
}
