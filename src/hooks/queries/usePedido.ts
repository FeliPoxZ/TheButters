import { PedidoCreateInput, PedidoResponse, PedidoUpdateInput } from "@/schemas/pedidoSchema";
import PedidoClient from "@/services/PedidoClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const pedidoClient = new PedidoClient();

export function usePedido(id?: string) {
	const qc = useQueryClient();

	// =============================
	// GET
	// =============================
	const getPedido = useQuery<PedidoResponse>({
		queryKey: ["pedido", id],
		queryFn: () => pedidoClient.getById(id!),
		enabled: !!id,
	});

	// =============================
	// CREATE
	// =============================
	const createPedido = useMutation({
		mutationFn: (params: { data: PedidoCreateInput; token: string }) =>
			pedidoClient.create(params.data, params.token),
		onSuccess: (pedido) => {
			qc.setQueryData(["pedido", pedido.id], pedido);
		},
	});

	// =============================
	// UPDATE
	// =============================
	const updatePedido = useMutation({
		mutationFn: ({ id, data }: { id: string; data: PedidoUpdateInput }) =>
			pedidoClient.update(id, data),
		onSuccess: (pedido) => {
			qc.setQueryData(["pedido", pedido.id], pedido);
		},
	});

	return {
		getPedido,
		createPedido,
		updatePedido,
	};
}
