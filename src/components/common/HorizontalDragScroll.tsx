"use client";

import { useEffect, useRef, useState } from "react";
import RowView from "@/components/layout/RowView";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
	categories: string[];
}

function CategoryNavBar({ categories }: Props) {
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const [isScrollable, setIsScrollable] = useState<boolean>(false);
	const dragging = useRef({
		isDown: false,
		startX: 0,
		scrollLeft: 0,
		pointerId: 0,
	});

	const [isDragging, setIsDragging] = useState(false);
	const moved = useRef(false);

	// checa se o conteúdo excede a largura visível
	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;

		const check = () => {
			const currentEl = scrollRef.current;
			if (!currentEl) return;
			setIsScrollable(currentEl.scrollWidth > currentEl.clientWidth + 1);
		};

		check();
		const ro = new ResizeObserver(check);
		ro.observe(el);
		const mo = new MutationObserver(check);
		mo.observe(el, { childList: true, subtree: true, characterData: true });

		window.addEventListener("resize", check);
		return () => {
			ro.disconnect();
			mo.disconnect();
			window.removeEventListener("resize", check);
		};
	}, [categories]);

	// Função que cancela clicks caso tenha havido movimento
	function cancelClickOnDrag(e: MouseEvent) {
		if (moved.current) {
			e.preventDefault();
			e.stopImmediatePropagation();
			e.stopPropagation();
		}
	}

	// pointer handlers (mouse + touch)
	useEffect(() => {
		function onPointerDown(e: PointerEvent) {
			const el = scrollRef.current;
			if (!el) return;

			dragging.current.isDown = true;
			dragging.current.pointerId = e.pointerId;

			const rect = el.getBoundingClientRect();
			dragging.current.startX = e.pageX - rect.left;
			dragging.current.scrollLeft = el.scrollLeft;

			// reset movimento
			moved.current = false;
			setIsDragging(false); // ainda não é dragging até mover

			// Captura para garantir que os eventos sigam o pointer
			const target = e.target as Element | null;
			if (target && typeof target.setPointerCapture === "function") {
				try {
					target.setPointerCapture(e.pointerId);
				} catch {
					/* ignore */
				}
			}

			// Evita highlight e libera apenas scroll vertical
			el.style.userSelect = "none";
			el.style.touchAction = "pan-y";

			// Adiciona listener de click em capturing phase para poder cancelar
			window.addEventListener("click", cancelClickOnDrag, true);
		}

		function onPointerMove(e: PointerEvent) {
			const el = scrollRef.current;
			if (!el || !dragging.current.isDown) return;

			e.preventDefault();

			const rect = el.getBoundingClientRect();
			const x = e.pageX - rect.left;
			const walk = (x - dragging.current.startX) * 1; // sensibilidade = 1

			el.scrollLeft = dragging.current.scrollLeft - walk;

			// Se moveu uma distância considerável, marcamos como movimento real
			if (!moved.current && Math.abs(walk) > 5) {
				moved.current = true;
				setIsDragging(true);
			}
		}

		function onPointerUp(e: PointerEvent) {
			const el = scrollRef.current;

			if (dragging.current.isDown) {
				dragging.current.isDown = false;

				const target = e.target as Element | null;
				if (target && typeof target.releasePointerCapture === "function") {
					try {
						target.releasePointerCapture?.(dragging.current.pointerId);
					} catch {
						/* ignore */
					}
				}

				if (el) {
					el.style.userSelect = "";
					el.style.touchAction = "";
				}

				// Remover o listener do click com pequeno delay para garantir que ele capture o click
				setTimeout(() => {
					window.removeEventListener("click", cancelClickOnDrag, true);
				}, 50);

				// Reset do estado de dragging com pequeno delay para evitar clique acidental no release
				setTimeout(() => {
					setIsDragging(false);
					moved.current = false;
				}, 60);
			}
		}

		// adicionar listeners
		window.addEventListener("pointermove", onPointerMove);
		window.addEventListener("pointerup", onPointerUp);
		const el = scrollRef.current;
		el?.addEventListener("pointerdown", onPointerDown);
		el?.addEventListener("pointerleave", onPointerUp);

		// cleanup
		return () => {
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", onPointerUp);
			el?.removeEventListener("pointerdown", onPointerDown);
			el?.removeEventListener("pointerleave", onPointerUp);
			window.removeEventListener("click", cancelClickOnDrag, true);
		};
	}, []); // dependências vazias: handlers usam sempre scrollRef.current

	const rowClass = cn("gap-6 flex flex-row items-center pl-6", !isScrollable ? "justify-center" : "justify-start");

	// Handler que previne navegação se detectamos drag
	const handleLinkClick = (e: React.MouseEvent) => {
		if (moved.current) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	return (
		<nav
			role="navigation"
			aria-label="Categorias do cardápio"
			className="bg-primary min-w-full py-2 sticky -top-px pl-5 md:pl-11 shadow-md"
		>
			<div
				ref={scrollRef}
				data-hide-scroll="true"
				className="overflow-x-auto -mx-5 md:-mx-40"
				style={{
					scrollbarWidth: "none",
					msOverflowStyle: "none",
				}}
			>
				<div className={rowClass}>
					{categories.map((category, i) => (
						<Link
							className={cn(
								"text-item text-lg md:text-xl transition-all hover:scale-105 duration-200 shrink-0",
								i === 0 ? "text-highlight font-semibold" : "",
								isDragging ? "pointer-events-none" : ""
							)}
							key={category}
							href={""}
							onClick={handleLinkClick}
						>
							{category}
						</Link>
					))}
				</div>
			</div>

			<style jsx global>{`
				[data-hide-scroll="true"]::-webkit-scrollbar {
					display: none;
					height: 0px;
				}
				[data-hide-scroll="true"] {
					-webkit-overflow-scrolling: touch;
				}
			`}</style>
		</nav>
	);
}

export default CategoryNavBar;
