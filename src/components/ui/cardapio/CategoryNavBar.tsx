"use client";

import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import ms from "ms";

interface Props {
	categories: Category[];
}

export default function CategoryNavBar({ categories }: Props) {
	const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
		mode: "free",
		rubberband: true,
		slides: {
			perView: "auto",
		},
		renderMode: "performance",
	});

	const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].nome);
	const [observerPaused, setObserverPaused] = useState(false);
	const waitingScrollRef = useRef(false);

	const categoryIds = categories.map((c) => c.nome);

	useSectionObserver(categoryIds, setSelectedCategory, observerPaused);

	function handleCategoryClick(id: string, index: number) {
		setSelectedCategory(id);

		// ---- Pausar observer ----
		setObserverPaused(true);
		setTimeout(() => {
			waitingScrollRef.current = true;
		}, ms("2s"));

		// ---- Mover o slider até o item clicado ----
		if (slider.current) {
			slider.current.moveToIdx(index, true);
		}
	}

	useEffect(() => {
		function handleScroll() {
			// Só reativa se estivermos aguardando scroll
			if (waitingScrollRef.current) {
				waitingScrollRef.current = false; // sair do modo espera
				setObserverPaused(false); // reativar observer
			}
		}

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (!slider.current) return;

		const index = categories.findIndex((c) => c.nome === selectedCategory);
		if (index !== -1) {
			slider.current.moveToIdx(index, true);
		}
	}, [selectedCategory, categories, slider]);

	return (
		<nav className="bg-primary sticky -top-px pl-5 md:pl-11 shadow-md w-full z-10">
			<div ref={sliderRef} className="keen-slider overflow-visible">
				{categories.map(({ nome }, i, arr) => (
					<div
						key={`${nome} nav-link`}
						className={cn(
							"keen-slider__slide w-auto! min-w-max! transition-all duration-200 flex",
							i < arr.length - 1 && "mr-6"
						)}
					>
						<Link
							href={`#${nome}`}
							onClick={() => handleCategoryClick(nome, i)}
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
