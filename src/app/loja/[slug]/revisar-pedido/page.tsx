"use client";

import CommonHeader from "@/components/common/CommonHeader";
import CommonFooter from "@/components/common/CommonFooter";
import ColumnView from "@/components/layout/ColumnView";
import RowView from "@/components/layout/RowView";
import { cn, toPrice } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BanknotesIcon, ArrowUturnLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import Line from "@/components/common/Line";
import useBagStore from "../stores/useBagStore";
import { useCustomerStore } from "../../stores/customerStore";

export default function RevisarPedido() {
	const items = useBagStore((s) => s.items);
	const getTotal = useBagStore((s) => s.useBagTotal);
	const getBagQtd = useBagStore((s) => s.useBagQuantity);

	const [total, setTotal] = useState(0);
	const [bagQtd, setBagQtd] = useState(0);

	useEffect(() => {
		setTotal(getTotal());
	}, [getTotal]);

	useEffect(() => {
		setBagQtd(getBagQtd());
	}, [getBagQtd]);

	const { slug } = useParams();

	const customer = useCustomerStore((s) => s.customer);
	const pathname = usePathname();

	return (
		<div className="grid grid-rows-[auto_1fr_auto] max-w-7xl min-h-screen md:h-screen mx-auto px-4 py-6 overflow-y-auto">
			<div className="bg-item rounded-2xl shadow-md overflow-hidden mb-6">
				<CommonHeader
					extra={
						<RowView align="center" className={cn(customer && "gap-2", "text-extra-orange")}>
							<p className="text-lg">{customer ? customer.nome : ""}</p>
							<Link
								href={`/loja/cliente${customer ? "" : "-login"}?redirect=${pathname}`}
								className="flex justify-center items-center cursor-pointer rounded-full bg-banner/55 size-10 transition-all duration-200 hover:scale-110 shadow-sm"
							>
								<UserIcon className="size-6 text-inherit" />
							</Link>
						</RowView>
					}
				/>
				<div className="py-4 px-6">
					<h2 className="text-2xl md:text-3xl font-bold text-foreground/90 mb-3">
						Revise seu pedido
					</h2>
					<p className="text-sm md:text-base text-foreground/70">
						Verifique todos os itens do seu pedido antes de finalizar
					</p>
				</div>
			</div>
			<div className="relative bg-item min-h-full md:h-full md:overflow-hidden rounded-2xl shadow-md py-4 px-6">
				<div className="flex flex-col md:flex-row h-full w-full">
					<div className="h-full w-full md:overflow-y-auto md:px-6">
						{items.map(({ item, qtd }) => (
							<Item key={"item" + item.id} qtd={qtd} price={item.preco} />
						))}
					</div>
					<hr className="h-1 w-full md:h-full md:w-[3px] my-4 md:my-0 md:mx-4 bg-[#BEBEBE] border-0" />
					<ColumnView justify="end" className="w-full md:w-2/5 h-fit md:h-full gap-2">
						<RowView justify="between" align="baseline" className="gap-2 w-full px-1">
							<p className="text-foreground/90">Quantidade de items</p>
							<p className="text-foreground/90">{bagQtd}</p>
						</RowView>
						<RowView justify="between" align="baseline" className="gap-2 w-full px-1">
							<p className="text-xl text-foreground/90 font-semibold">Total a Pagar</p>
							<p className="text-xl text-on-soft-green/90 font-semibold">{toPrice(total)}</p>
						</RowView>
						<Line />
						<RowView className="gap-2 w-full">
							<Link
								href={`/loja/${slug}/cardapio`}
								className="h-10 w-full bg-primary/60 rounded-sm font-poppins flex justify-center items-center gap-2 text-foreground/90"
							>
								<p className="font-medium">Voltar</p>
								<ArrowUturnLeftIcon className="size-5 text-inherit" />
							</Link>
							<Link
								href={`/loja/${slug}/finalizar-pedido/consumo`}
								className="px-3 h-10 w-full bg-soft-green rounded-sm font-poppins flex justify-center items-center gap-2 text-foreground/90"
							>
								<p className="font-medium">Pagamento</p>
								<BanknotesIcon className="size-6 text-inherit" />
							</Link>
						</RowView>
					</ColumnView>
				</div>
			</div>
			<CommonFooter roundedTop />
		</div>
	);
}

const Item = ({ qtd, price }: { qtd: number; price: number }) => {
	return (
		<ColumnView className="w-full">
			<RowView align="center" justify="between" className="w-full py-2">
				<p className="font-semibold text-foreground/90">{"Cookie"}</p>
			</RowView>
			<RowView align="baseline" className="text-sm w-full">
				<RowView className="gap-2">
					<p>{qtd}x</p>
					<p>{toPrice(price)}</p>
				</RowView>
				<hr className="flex-1 border-b border-dotted mx-2" />
				<p className="font-semibold text-on-soft-green/80">{toPrice(qtd * price)}</p>
			</RowView>
			<hr className="bg-[#BEBEBE] h-px w-full border-0 my-3" />
		</ColumnView>
	);
};
