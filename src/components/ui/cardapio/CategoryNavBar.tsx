"use client";

import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Category = string;

interface Props {
	categories: Category[];
}

export default function CategoryNavBar({ categories }: Props) {
	const [selectedCategory, setSelectedCategory] = useState<Category>("");

	const [sliderRef] = useKeenSlider<HTMLDivElement>({
		mode: "free",
		rubberband: true,
		slides: {
			perView: "auto",
			spacing: 24,
		},
	});

	return (
		<nav className="bg-primary py-2 sticky -top-px pl-5 md:pl-11 shadow-md w-full">
			<div ref={sliderRef} className="keen-slider overflow-visible">
				{categories.map((category, i, arr) => (
					<div key={category} className="keen-slider__slide w-auto! min-w-max!">
						<Link
							href={`#${category}`}
							onClick={() => setSelectedCategory(category)}
							className={cn(
								"text-item text-lg md:text-xl transition-all hover:scale-105 duration-200 shrink-0 whitespace-nowrap",
								selectedCategory === category && "text-highlight font-semibold",
								i === arr.length - 1 && "mr-5"
							)}
						>
							{category}
						</Link>
					</div>
				))}
			</div>
		</nav>
	);
}
