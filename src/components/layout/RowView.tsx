import React, { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

type RowViewProps = {
	children: ReactNode | ReactElement;
	align?: "start" | "center" | "end" | "stretch" | "baseline";
	justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
	reversed?: boolean;
	className?: string;
};

const RowView = ({
	children,
	align = "start",
	justify = "start",
	reversed = false,
	className,
}: RowViewProps) => {
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

	return (
		<div
			className={cn(
				"flex",
				reversed ? "flex-row-reverse" : "flex-row",
				alignMap[align],
				justifyMap[justify],
				className
			)}
		>
			{children}
		</div>
	);
};

export default RowView;
