"use client";

import { useState, useMemo } from "react";
import { Trash } from "lucide-react";

import CommonHeader from "@/components/common/CommonHeader";
import CommonFooter from "@/components/common/CommonFooter";
import ExtraHeader from "@/components/ui/gestao/ExtraHeader";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { usePedido } from "@/hooks/queries/usePedido";
import { toPrice } from "@/lib/utils";

export default function PedidosPage() {
	const [filterStatus, setFilterStatus] = useState<string>("all");

	const { getAllPedidos, updatePedido, deletePedido } = usePedido();
	const pedidos = getAllPedidos.data ?? [];

	// =============================
	// FILTRO POR STATUS
	// =============================
	const filteredPedidos = useMemo(() => {
		return pedidos.filter((pedido) => {
			if (filterStatus === "all") return true;
			return pedido.statuspedido === filterStatus;
		});
	}, [pedidos, filterStatus]);

	// =============================
	// MAPEAMENTO DE LABELS
	// =============================
	const statusLabels: Record<string, string> = {
		A: "Aberto",
		B: "Aguardando Pagamento",
		P: "Pago",
		E: "Em Preparo",
		F: "Finalizado",
		S: "Saiu p/ Entrega",
	};

	const statusOptions = [
		{ value: "A", label: "Aberto" },
		{ value: "B", label: "Aguardando Pagamento" },
		{ value: "P", label: "Pago" },
		{ value: "E", label: "Em Preparo" },
		{ value: "F", label: "Finalizado" },
		{ value: "S", label: "Saiu p/ Entrega" },
	];

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-7xl mx-auto px-4 py-6">
				<div className="bg-item rounded-2xl shadow-md overflow-hidden mb-6">
					<CommonHeader extra={<ExtraHeader />} />

					<div className="p-4 space-y-4">
						{/* ======================= */}
						{/* FILTRO DE STATUS */}
						{/* ======================= */}
						<div className="flex items-center gap-4">
							<Select value={filterStatus} onValueChange={setFilterStatus}>
								<SelectTrigger className="w-60">
									<SelectValue placeholder="Filtrar por status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Todos</SelectItem>
									<SelectItem value="A">Aberto</SelectItem>
									<SelectItem value="B">Aguardando Pagamento</SelectItem>
									<SelectItem value="P">Pago</SelectItem>
									<SelectItem value="E">Em Preparo</SelectItem>
									<SelectItem value="F">Finalizado</SelectItem>
									<SelectItem value="S">Saiu para Entrega</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
				{/* ======================= */}
				{/* TABELA */}
				{/* ======================= */}
				<main className="overflow-x-auto bg-white border border-orange-200 rounded-xl shadow-sm">
					<table className="w-full text-left">
						<thead className="bg-orange-50 border-b border-orange-200">
							<tr className="text-orange-900 text-sm font-semibold">
								<th className="p-3">Status</th>
								<th className="p-3">Cliente</th>
								<th className="p-3">Preço Total</th>
								<th className="p-3">Data</th>
								<th className="p-3">Produtos</th>
								<th className="p-3 text-right">Ações</th>
							</tr>
						</thead>

						<tbody className="text-sm">
							{filteredPedidos.length === 0 && (
								<tr>
									<td className="p-4 text-center text-zinc-500" colSpan={6}>
										Nenhum pedido encontrado
									</td>
								</tr>
							)}

							{filteredPedidos.map((p) => (
								<tr key={p.id} className="border-b border-orange-100 hover:bg-orange-50 transition">
									<td className="p-3 w-66">
										<Select
											defaultValue={p.statuspedido}
											onValueChange={(value) =>
												updatePedido.mutate({
													id: p.id,
													data: {
														status_pedido: value as "E" | "A" | "B" | "P" | "F" | "S" | undefined,
													},
												})
											}
											disabled={updatePedido.isPending}
										>
											<SelectTrigger className="w-56">
												<SelectValue placeholder="Status" />
											</SelectTrigger>
											<SelectContent>
												{statusOptions.map((opt) => (
													<SelectItem key={opt.value + p.id} value={opt.value}>
														{opt.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</td>

									<td className="p-3 text-zinc-700">{p.usuario?.nome ?? "—"}</td>

									<td className="p-3 text-green-600 font-semibold">{toPrice(p.precototal)}</td>

									<td className="p-3 text-zinc-600">
										{new Date(p.datapedido).toLocaleString("pt-BR")}
									</td>

									<td className="p-3 text-zinc-700">
										<ul className="space-y-1">
											{p.items.map((item) => (
												<li key={item.produto.id + p.id + Date.now()}>
													• {item.produto?.nome} ({item.quantidade}x)
												</li>
											))}
										</ul>
									</td>

									{/* AÇÕES */}
									<td className="p-3 text-right">
										<div className="flex justify-end gap-2">
											<button
												onClick={() => deletePedido.mutate(p.id)}
												className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition cursor-pointer"
											>
												<Trash size={18} />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</main>

				<CommonFooter roundedTop />
			</div>
		</div>
	);
}
