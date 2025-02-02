import React, { useState, useEffect } from "react";
import P from "@/lib/pokeapi";
import Link from "next/link";

import { EyeNoneIcon } from "@radix-ui/react-icons";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

function AbilityChip({
	label,
	id,
	hidden,
	className,
	size = "md",
}: {
	label?: string;
	id: string;
	hidden?: boolean;
	className?: string;
	size?: "sm" | "md";
}) {
	const fontSize = size === "sm" ? "text-sm" : "text-base";

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<div
						className={`flex items-center gap-2 ${fontSize} ${className}`}
					>
						{hidden && <EyeNoneIcon />}
						<Link
							href={"#"}
							className="capitalize hover:underline underline-offset-4"
						>
							{label ? label : id}
						</Link>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<AbilityPopup id={id} hidden={hidden} />
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

function AbilityPopup({ id, hidden }: { id: string; hidden?: boolean }) {
	"use client";
	const [ability, setAbility] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await P.getAbilityByName(id);
				setAbility(response);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="w-40 py-2">
			<p className="text-[0.65rem] uppercase tracking-wider">
				{hidden && "Hidden "}Ability
			</p>
			<div className="text-sm font-semibold capitalize">
				{ability.name}
			</div>
			<div className="text-xs mt-2">
				{
					ability.flavor_text_entries.find(
						(entry) => entry.language.name === "en"
					)?.flavor_text
				}
			</div>
		</div>
	);
}

export { AbilityChip };
