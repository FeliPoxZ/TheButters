"use client";

import CommonHeader from "@/components/common/CommonHeader";
import useBagStore from "../../stores/useBagStore";
import CommonFooter from "@/components/common/CommonFooter";
import ColumnView from "@/components/layout/ColumnView";
import RowView from "@/components/layout/RowView";
import { toPrice } from "@/lib/utils";

export default function RevisarPedido() {
	const items = useBagStore((s) => s.items);

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
						<ColumnView className="w-full">
							<RowView align="center" justify="between" className="w-full py-2">
								<p className="font-semibold text-foreground/90">{"Cookie"}</p>
							</RowView>
							<RowView align="baseline" className="text-sm w-full">
								<RowView className="gap-2">
									<p>{2}x</p>
									<p>{toPrice(10)}</p>
								</RowView>
								<hr className="flex-1 border-b border-dotted mx-2" />
								<p className="font-semibold text-on-soft-green/80">{toPrice(2 * 10)}</p>
							</RowView>
							<hr className="bg-[#BEBEBE] h-px w-full border-0 my-3" />
						</ColumnView>
						<ColumnView className="w-full">
							<RowView align="center" justify="between" className="w-full py-2">
								<p className="font-semibold text-foreground/90">{"Cookie"}</p>
							</RowView>
							<RowView align="baseline" className="text-sm w-full">
								<RowView className="gap-2">
									<p>{2}x</p>
									<p>{toPrice(10)}</p>
								</RowView>
								<hr className="flex-1 border-b border-dotted mx-2" />
								<p className="font-semibold text-on-soft-green/80">{toPrice(2 * 10)}</p>
							</RowView>
							<hr className="bg-[#BEBEBE] h-px w-full border-0 my-3" />
						</ColumnView>
						<ColumnView className="w-full">
							<RowView align="center" justify="between" className="w-full py-2">
								<p className="font-semibold text-foreground/90">{"Cookie"}</p>
							</RowView>
							<RowView align="baseline" className="text-sm w-full">
								<RowView className="gap-2">
									<p>{2}x</p>
									<p>{toPrice(10)}</p>
								</RowView>
								<hr className="flex-1 border-b border-dotted mx-2" />
								<p className="font-semibold text-on-soft-green/80">{toPrice(2 * 10)}</p>
							</RowView>
							<hr className="bg-[#BEBEBE] h-px w-full border-0 my-3" />
						</ColumnView>
						<ColumnView className="w-full">
							<RowView align="center" justify="between" className="w-full py-2">
								<p className="font-semibold text-foreground/90">{"Cookie"}</p>
							</RowView>
							<RowView align="baseline" className="text-sm w-full">
								<RowView className="gap-2">
									<p>{2}x</p>
									<p>{toPrice(10)}</p>
								</RowView>
								<hr className="flex-1 border-b border-dotted mx-2" />
								<p className="font-semibold text-on-soft-green/80">{toPrice(2 * 10)}</p>
							</RowView>
							<hr className="bg-[#BEBEBE] h-px w-full border-0 my-3" />
						</ColumnView>
						<ColumnView className="w-full">
							<RowView align="center" justify="between" className="w-full py-2">
								<p className="font-semibold text-foreground/90">{"Cookie"}</p>
							</RowView>
							<RowView align="baseline" className="text-sm w-full">
								<RowView className="gap-2">
									<p>{2}x</p>
									<p>{toPrice(10)}</p>
								</RowView>
								<hr className="flex-1 border-b border-dotted mx-2" />
								<p className="font-semibold text-on-soft-green/80">{toPrice(2 * 10)}</p>
							</RowView>
							<hr className="bg-[#BEBEBE] h-px w-full border-0 my-3" />
						</ColumnView>
						<ColumnView className="w-full">
							<RowView align="center" justify="between" className="w-full py-2">
								<p className="font-semibold text-foreground/90">{"Cookie"}</p>
							</RowView>
							<RowView align="baseline" className="text-sm w-full">
								<RowView className="gap-2">
									<p>{2}x</p>
									<p>{toPrice(10)}</p>
								</RowView>
								<hr className="flex-1 border-b border-dotted mx-2" />
								<p className="font-semibold text-on-soft-green/80">{toPrice(2 * 10)}</p>
							</RowView>
							<hr className="bg-[#BEBEBE] h-px w-full border-0 my-3" />
						</ColumnView>
						<ColumnView className="w-full">
							<RowView align="center" justify="between" className="w-full py-2">
								<p className="font-semibold text-foreground/90">{"Cookie"}</p>
							</RowView>
							<RowView align="baseline" className="text-sm w-full">
								<RowView className="gap-2">
									<p>{2}x</p>
									<p>{toPrice(10)}</p>
								</RowView>
								<hr className="flex-1 border-b border-dotted mx-2" />
								<p className="font-semibold text-on-soft-green/80">{toPrice(2 * 10)}</p>
							</RowView>
							<hr className="bg-[#BEBEBE] h-px w-full border-0 my-3" />
						</ColumnView>
					</div>
                    <hr className="h-full w-[3px] mx-4 bg-[#BEBEBE] border-0"/>
                    <div className="w-1/4 h-full"></div>
				</RowView>
			</div>
			{/*             <div className="h-20 w-full bg-item rounded-2xl shadow-md mt-6">

            </div> */}
			<CommonFooter roundedTop />
		</div>
	);
}
