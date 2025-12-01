"use client";

import { useCheckoutStore } from "@/app/loja/[slug]/stores/checkoutStore";
import CommonFooter from "@/components/common/CommonFooter";
import CommonHeader from "@/components/common/CommonHeader";
import ColumnView from "@/components/layout/ColumnView";
import { useCustomerStore } from "@/app/loja/stores/customerStore";
import { useParams, usePathname, useRouter } from "next/navigation";
import useBagStore from "../../stores/useBagStore";
import { useLojaStore } from "../../stores/lojaStore";
import { useEffect, useState } from "react";
import { usePedido } from "@/hooks/queries/usePedido";
import { toast } from "react-toastify";
import { toPrice } from "@/lib/utils";
import ms from "ms";
import AccountLink from "@/components/ui/cardapio/AccountLink";
import { BanknotesIcon } from "@heroicons/react/24/outline";

export default function Pagamento() {
	const consumo = useCheckoutStore((s) => s.consumo);
	const customer = useCustomerStore((s) => s.customer);
	const token = useCustomerStore((s) => s.token);
	const getTotal = useBagStore((s) => s.useBagTotal);
	const clearBag = useBagStore((s) => s.clearBag);
	const lojaId = useLojaStore((s) => s.lojaId);

	const [total, setTotal] = useState(0);
	const [observacao, setObservacao] = useState("");
	const [mesa, setMesa] = useState<number | null>(null);

	const { createPedido } = usePedido();

	useEffect(() => {
		setTotal(getTotal());
	}, [getTotal]);

	const { slug } = useParams();

	const router = useRouter();
	const pathname = usePathname();

	// ==========================
	//   EFETUAR PEDIDO
	// ==========================
	const handleCreatePedido = () => {
		if (!customer?.id || !token) {
			toast.error("Cliente não encontrado. Faça o login e tente novamente.", {
				autoClose: false,
				onClose: () => {
					router.replace(`/loja/cliente-login?redirect=${pathname}`);
				},
			});
			return;
		}

		if (!lojaId) {
			toast.error("Erro ao acessar a loja! Faça o pedido novamente.", {
				autoClose: false,
				onClose: () => {
					router.replace(`/lojas/${slug}/cardapio`);
				},
			});
			return;
		}

		if (!consumo) {
			toast.error("Tipo de consumo não definido. Volte e tente novamente.", {
				autoClose: false,
				onClose: () => {
					router.replace(`/lojas/${slug}/revisar-pedido`);
				},
			});
			return;
		}

		// validação da mesa
		if (consumo === "M") {
			if (!mesa || mesa <= 0) {
				toast.warn("Informe o número da mesa.");
				return;
			}
		}

		const finalMesa = consumo === "M" ? mesa ?? 0 : 0;

		const payload = {
			data: {
				precototal: total,
				precoentrega: consumo === "E" ? 10 : 0,
				tipopedido: (consumo as "M" | "R" | "E" | "T") ?? "A",
				statuspedido: "A" as "E" | "A" | "B" | "P" | "F" | "S",
				observacao: observacao || undefined,
				mesa: finalMesa,

				lojaid: lojaId,
				usuarioid: customer.id,
				enderecoid: null,
			},
			token,
		};

		createPedido.mutate(payload, {
			onSuccess: () => {
				toast.success("Pedido efetuado com sucesso!", {
					autoClose: false,
					onClose: () => {
						clearBag();
						router.replace(`/loja/${slug}/cardapio`);
					},
				});
			},
			onError: () => {
				toast.error("Erro ao criar pedido", { autoClose: ms("3s") });
			},
		});
	};

	return (
		<div className="grid grid-rows-[auto_1fr_auto] max-w-7xl min-h-screen mx-auto px-4 py-6 overflow-y-auto">
			<div className="bg-item rounded-2xl shadow-md overflow-hidden mb-6">
				<CommonHeader extra={<AccountLink redirect={pathname} />} />
				<div className="py-4 px-6">
					<h2 className="text-2xl md:text-3xl font-bold text-foreground/90 mb-3">
						Finalização do Pedido
					</h2>
					<p className="text-sm md:text-base text-foreground/70">Esta é a última etapa</p>
				</div>
			</div>

			<div className="relative bg-item min-h-full md:h-full md:overflow-hidden rounded-2xl shadow-md py-4 px-6">
				<div className="flex flex-col md:flex-row h-full w-full">
					<ColumnView className="w-full h-full">
						<h2 className="text-foreground/90 font-medium text-xl mb-4">Finalize o pedido:</h2>

						{/* OBSERVAÇÃO */}
						<div className="flex flex-col gap-3 w-full max-w-lg">
							<label className="text-lg text-foreground/80">Observação do pedido (opcional)</label>
							<input
								className="bg-background/30 p-3 rounded-lg outline-none border border-foreground/10"
								placeholder="Ex: retirar algum ingrediente..."
								value={observacao}
								onChange={(e) => setObservacao(e.target.value)}
							/>
						</div>

						{/* CAMPO MESA OBRIGATÓRIO */}
						{consumo === "M" && (
							<div className="flex flex-col gap-3 w-full max-w-lg mt-5">
								<label className="text-lg text-foreground/80">
									Número da mesa <span className="text-extra-red/80">*</span>
								</label>
								<input
									type="number"
									min={1}
									className="bg-background/30 p-3 rounded-lg outline-none border border-foreground/10"
									placeholder="Ex: 12"
									value={mesa ?? ""}
									onChange={(e) => setMesa(Number(e.target.value))}
								/>
							</div>
						)}

						{/* TOTAL */}
						<div className="mt-6 text-lg font-semibold text-foreground/90">
							Valor total: <span className="text-on-soft-green/90">{toPrice(total)}</span>
						</div>

						{/* BOTÃO */}
						<div className="mt-4 sm:mt-10 w-full">
							<button
								onClick={handleCreatePedido}
								disabled={createPedido.isPending}
								className="flex items-center justify-center gap-2 w-full md:w-auto px-10 py-4 mt-6 rounded-xl bg-primary/90 text-lg text-primary-foreground/95 font-semibold hover:opacity-90 disabled:opacity-50"
							>
								{createPedido.isPending ? "Enviando pedido..." : "Efetuar Pedido"}
								<BanknotesIcon className="text-inherit size-7"/>
							</button>
						</div>
					</ColumnView>
				</div>
			</div>

			<CommonFooter roundedTop />
		</div>
	);
}
