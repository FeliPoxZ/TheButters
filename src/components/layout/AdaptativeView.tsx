import { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

type FlexDirection = "row" | "row-reverse" | "col" | "col-reverse";

type AdaptativeViewProps = {
	children: ReactNode | ReactElement;

	direction?: Partial<Record<Breakpoint, FlexDirection>>;

	align?: "start" | "center" | "end" | "stretch" | "baseline";
	justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
	className?: string;
};

const AdaptativeView = ({
	children,
	direction = { base: "row" },
	align = "start",
	justify = "start",
	className,
}: AdaptativeViewProps) => {
	const alignMap = {
		start: "items-start",
		center: "items-center",
		end: "items-end",
		stretch: "items-stretch",
		baseline: "items-baseline",
	};

	const justifyMap = {
		start: "justify-start",
		center: "justify-center",
		end: "justify-end",
		between: "justify-between",
		around: "justify-around",
		evenly: "justify-evenly",
	};

	// Gera classes responsivas com base no objeto direction
	const directionClasses = Object.entries(direction).map(([key, value]) => {
		const prefix = key === "base" ? "" : `${key}:`;
		return `${prefix}flex-${value}`;
	});

	return (
		<div className={cn("flex", alignMap[align], justifyMap[justify], directionClasses, className)}>
			{children}
		</div>
	);
};

export default AdaptativeView;
