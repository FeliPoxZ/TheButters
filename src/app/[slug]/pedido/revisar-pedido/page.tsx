"use client";

import CommonHeader from "@/components/common/CommonHeader";
import useBagStore from "../../stores/useBagStore";
import CommonFooter from "@/components/common/CommonFooter";
import ColumnView from "@/components/layout/ColumnView";
import RowView from "@/components/layout/RowView";
import { toPrice } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BanknotesIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

export default function RevisarPedido() {
	const items = useBagStore((s) => s.items);
	const getTotal = useBagStore((s) => s.useBagTotal);

	const [total, setTotal] = useState(0);

	useEffect(() => {
		setTotal(getTotal());
	}, [getTotal]);

	const { slug } = useParams();

	return (
		<div className="grid grid-rows-[auto_1fr_auto] max-w-7xl h-screen mx-auto px-4 py-6">
			<div className="bg-item rounded-2xl shadow-md overflow-hidden mb-6">
				<CommonHeader />
				<div className="py-4 px-6">
					<h2 className="text-2xl md:text-3xl font-bold text-foreground/90 mb-3">
						Revise seu pedido
					</h2>
					<p className="text-sm md:text-base text-foreground/70">
						Verifique todos os itens do seu pedido antes de finalizar
					</p>
				</div>
			</div>
			<div className="relative bg-item h-full overflow-hidden rounded-2xl shadow-md py-4 px-6">
				<RowView className="h-full w-full">
					<div className="h-full w-full overflow-y-auto px-6">
						{items.map(({ item, qtd }) => (
							<ColumnView className="w-full" key={"item" + item.id}>
								<RowView align="center" justify="between" className="w-full py-2">
									<p className="font-semibold text-foreground/90">{"Cookie"}</p>
								</RowView>
								<RowView align="baseline" className="text-sm w-full">
									<RowView className="gap-2">
										<p>{qtd}x</p>
										<p>{toPrice(item.preco)}</p>
									</RowView>
									<hr className="flex-1 border-b border-dotted mx-2" />
									<p className="font-semibold text-on-soft-green/80">{toPrice(qtd * item.preco)}</p>
								</RowView>
								<hr className="bg-[#BEBEBE] h-px w-full border-0 my-3" />
							</ColumnView>
						))}
					</div>
					<hr className="h-full w-[3px] mx-4 bg-[#BEBEBE] border-0" />
					<ColumnView justify="end" className="w-1/3 h-full gap-2">
						<RowView justify="between" align="baseline" className="gap-2 w-full">
							<p className="text-xl text-foreground/90 font-semibold">Total a Pagar</p>
							{/* <hr className="flex-1 border-b border-dotted mx-2" /> */}
							<p className="text-xl text-on-soft-green/90 font-semibold">{toPrice(total)}</p>
						</RowView>
						<RowView className="gap-2 w-full">
							<Link href={`/${slug}/cardapio`} className="h-10 w-full bg-primary/60 rounded-sm font-poppins flex justify-center items-center gap-2 text-foreground/90">
								<p className="font-medium">Voltar</p>
								<ArrowUturnLeftIcon className="size-5 text-inherit"/>
							</Link>
							<Link
								href={`/${slug}/pedido/finalizar-pedido`}
								className="px-3 h-10 w-full bg-soft-green rounded-sm font-poppins flex justify-center items-center gap-2 text-foreground/90"
							>
								<p className="font-medium">Pagamento</p>
								<BanknotesIcon className="size-6 text-inherit"/>
							</Link>
						</RowView>
					</ColumnView>
				</RowView>
			</div>
			<CommonFooter roundedTop />
		</div>
	);
}
