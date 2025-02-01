import {
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface NicknameFieldProps {
	value: string;
	onChange: (value: string) => void;
}

export default function NicknameField({ value, onChange }: NicknameFieldProps) {
	return (
		<FormItem>
			<FormLabel>Nickname</FormLabel>
			<Input value={value} onChange={(e) => onChange(e.target.value)} />
			<FormDescription>
				Provide a nickname for your Pokemon
			</FormDescription>
			<FormMessage />
		</FormItem>
	);
}
