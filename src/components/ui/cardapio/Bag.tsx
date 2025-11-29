import ColumnView from "@/components/layout/ColumnView";
import RowView from "@/components/layout/RowView";
import { cn, toPrice } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import BagItem from "./BagItem";
import useBagStore from "@/app/[slug]/stores/useBagStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Modal } from "@/components/common/Modal";

function Bag() {
	const [isBagOpen, setBagOpen] = useState(false);
	const [total, setTotal] = useState(0);
	const [qtd, setQtd] = useState(0);
	const [notify, setNotify] = useState(false);

	const items = useBagStore((s) => s.items);
	const getTotal = useBagStore((s) => s.useBagTotal);
	const clearBag = useBagStore((s) => s.clearBag);
	const getBagQuantity = useBagStore((s) => s.useBagQuantity);

	const prevCountRef = useRef(getBagQuantity());

	useEffect(() => {
		setTotal(getTotal());

		const prevCount = prevCountRef.current;
		const currentCount = getBagQuantity();

		setQtd(currentCount);

		// Se adicionou item (aumentou)
		if (currentCount > prevCount) {
			// ativa notificação somente se a bag estiver fechada
			if (!isBagOpen && currentCount !== 0) setNotify(true);
		}

		// se abrir a bag → remove notificação
		if (isBagOpen) {
			setNotify(false);
		}

		// atualiza o contador anterior
		prevCountRef.current = currentCount;
	}, [items, isBagOpen, getTotal]);

	const { slug } = useParams();

	return (
		<aside
			className={cn(
				"fixed z-20 bg-banner transition-all duration-300 bag-bar border-t-secondary border-l-secondary",
				"w-full h-2/5 border-t-6",
				"md:w-2/5 xl:w-1/5 md:h-screen md:top-0 md:border-l-6 md:border-t-0",
				isBagOpen ? "bottom-0 md:right-0" : "-bottom-2/5 md:-right-2/5 xl:-right-1/5 md:bottom-0"
			)}
		>
			<div className="relative w-full h-full p-3">
				<button
					onClick={() => setBagOpen(!isBagOpen)}
					className={cn(
						"absolute bg-banner size-14 rounded-tl-[50%] bag-button flex justify-center items-center",
						"-top-[54px] right-0",
						"md:-left-[54px] md:bottom-0 md:top-auto",
						notify && "notify"
					)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-8 ml-1.5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
						/>
					</svg>
				</button>
				<ColumnView className="h-full w-full gap-3">
					<div className="bg-item/90 h-full w-full rounded-md px-3 py-2 overflow-y-auto">
						{items.map(({ item }, i) => (
							<BagItem key={"bag mobile " + item.nome} item={item} itemIndex={i} />
						))}
					</div>
					<div className="bg-item/90 h-fit w-full rounded-md px-3 py-2">
						<RowView align="center" justify="between">
							<ColumnView>
								<p className="text-foreground/90 font-semibold">Total</p>
								<p className="text-on-soft-green/90 font-semibold">{toPrice(total)}</p>
							</ColumnView>
							<RowView className="gap-2">
								<button className="size-10 bg-extra-red/60 rounded-sm" onClick={clearBag}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6 m-auto"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
										/>
									</svg>
								</button>
								{qtd > 0 ? (
									<Link
										href={`/${slug}/pedido/revisar-pedido`}
										className="px-3 w-fit h-10 bg-soft-green rounded-sm font-poppins flex justify-between items-center gap-1"
									>
										<p>REVISAR</p>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="size-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
											/>
										</svg>
									</Link>
								) : (
									<div
										className="px-3 w-fit h-10 bg-soft-green/60 rounded-sm font-poppins flex justify-between items-center gap-1"
									>
										<p>REVIZAR</p>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="size-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
											/>
										</svg>
									</div>
								)}
							</RowView>
						</RowView>
					</div>
				</ColumnView>
			</div>
		</aside>
	);
}

export default Bag;
