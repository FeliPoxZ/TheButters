"use client";

import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props {
	categories: Category[];
}

export default function CategoryNavBar({ categories }: Props) {
	const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].nome);

	const [sliderRef] = useKeenSlider<HTMLDivElement>({
		mode: "free",
		rubberband: true,
		slides: {
			perView: "auto",
			spacing: 24,
		},
		renderMode: "performance",
	});

	return (
		<nav className="bg-primary sticky -top-px pl-5 md:pl-11 shadow-md w-full">
			<div ref={sliderRef} className="keen-slider overflow-visible">
				{categories.map(({ nome }, i, arr) => (
					<div
						key={`${nome} nav-link`}
						className={cn("keen-slider__slide w-auto! min-w-max! transition-all duration-200 flex")}
					>
						<Link
							href={`#${nome}`}
							onClick={() => setSelectedCategory(nome)}
							className={cn(
								"text-light-foreground text-lg md:text-xl h-full pt-2 pb-1 transition-all duration-200 shrink-0 whitespace-nowrap  border-b-4 border-b-transparent",
								selectedCategory === nome && "text-highlight font-semibold border-b-highlight"
							)}
						>
							{nome}
						</Link>
						{i === arr.length - 1 && <div className="w-5 h-full" />}
					</div>
				))}
			</div>
		</nav>
	);
}
