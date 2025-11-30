"use client";

import { useCheckoutStore } from "@/app/[slug]/stores/checkoutStore";
import CommonFooter from "@/components/common/CommonFooter";
import CommonHeader from "@/components/common/CommonHeader";
import ColumnView from "@/components/layout/ColumnView";
import { useCustomerStore } from "@/stores/customerStore";
import { BuildingStorefrontIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function Consumo() {
	const setConsumo = useCheckoutStore((s) => s.setConsumo);

	const customer = useCustomerStore((s) => s.customer);

	const { slug } = useParams();
	const pathname = usePathname();

	return (
		<div className="grid grid-rows-[auto_1fr_auto] max-w-7xl h-screen mx-auto px-4 py-6 overflow-y-auto">
			<div className="bg-item rounded-2xl shadow-md overflow-hidden mb-6">
				<CommonHeader />
				<div className="py-4 px-6">
					<h2 className="text-2xl md:text-3xl font-bold text-foreground/90 mb-3">
						Finalização do Pedido
					</h2>
					<p className="text-sm md:text-base text-foreground/70">
						Quase tudo pronto para o seu pedido
					</p>
				</div>
			</div>
			<div className="relative bg-item min-h-full md:h-full md:overflow-hidden rounded-2xl shadow-md py-4 px-6">
				<div className="flex flex-col md:flex-row h-full w-full">
					<ColumnView className="w-full h-full">
						<h2 className="text-foreground/70 text-xl">Escolha o modo de consumo:</h2>
						<section className="w-full grid grid-cols-1 md:flex md:justify-center gap-10 m-auto">
							<Link
								href={customer? `/${slug}/pedido/finalizar-pedido/pagamento` : `/cliente-login?redirect=${pathname}`}
								onClick={() => setConsumo("M")}
								className="
					bg-banner/70 hover:bg-banner/90 
					rounded-xl shadow-md 
					border-2 border-secondary/40
					transition-all cursor-pointer 
					active:scale-[0.98]
					p-10 flex flex-col items-center justify-center text-center
                    gap-1
				"
							>
								<BuildingStorefrontIcon className="size-16 text-foreground/90" />

								<h3 className="font-semibold text-4xl text-foreground/80">Local</h3>
								<p className="text-lg text-foreground/70 mt-1">Consumir no local</p>
							</Link>
							<Link
								href={customer? `/${slug}/pedido/finalizar-pedido/pagamento` : `/cliente-login?redirect=${pathname}`}
								onClick={() => setConsumo("R")}
								className="
					bg-banner/70 hover:bg-banner/90 
					rounded-xl shadow-md 
					border-2 border-secondary/40
					transition-all cursor-pointer 
					active:scale-[0.98]
					p-10 flex flex-col items-center justify-center text-center
                    gap-1
				"
							>
								<ShoppingBagIcon className="size-16 text-foreground/90" />

								<h3 className="font-semibold text-4xl text-foreground/80">Viagem</h3>
								<p className="text-lg text-foreground/70 mt-1">Retirar para viagem</p>
							</Link>
						</section>
					</ColumnView>
				</div>
			</div>
			<CommonFooter roundedTop />
		</div>
	);
}
