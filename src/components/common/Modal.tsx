"use client";
import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
	children: ReactNode | ReactNode[];
	open: boolean;
	onBackdropClick: () => void;
	blur?: boolean;
}

export function Modal({ children, open, onBackdropClick, blur = true }: Props) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted || !open) return null;

	return createPortal(
		<div
			className={cn(
				"fixed z-50 h-screen w-screen top-0 bottom-0 bg-black/70 flex items-center justify-center",
				blur && "backdrop-blur-[2px]s"
			)}
			onClick={onBackdropClick}
		>
			<div onClick={(e) => e.stopPropagation()} className="h-auto w-auto">
				{children}
			</div>
		</div>,
		document.getElementById("modal-root")!
	);
}
