import { PedidoCreateInput, PedidoResponse, PedidoUpdateInput } from "@/schemas/pedidoSchema";
import PedidoClient from "@/services/PedidoClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const pedidoClient = new PedidoClient();

export function usePedido() {
	const qc = useQueryClient();

	// =============================
	// GET ALL
	// =============================
	const getAllPedidos = useQuery<PedidoResponse[]>({
		queryKey: ["pedidos"],
		queryFn: () => pedidoClient.getAll(),
	});


	// =============================
	// CREATE
	// =============================
	const createPedido = useMutation({
		mutationFn: (params: { data: PedidoCreateInput; token: string }) =>
			pedidoClient.create(params.data, params.token),
		onSuccess: (pedido) => {
			qc.setQueryData(["pedidos", pedido.id], pedido);
		},
	});

	// =============================
	// UPDATE
	// =============================
	const updatePedido = useMutation({
		mutationFn: ({ id, data }: { id: string; data: PedidoUpdateInput }) =>
			pedidoClient.update(id, data),
		onSuccess: (pedido) => {
			qc.setQueryData(["pedidos", pedido.id], pedido);
		},
	});

	// =============================
	// DELETE / CANCELAR
	// =============================
	const deletePedido = useMutation({
		mutationFn: (id: string) => pedidoClient.delete(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["pedidos"] });
		},
	});

	return {
		getAllPedidos,
		createPedido,
		updatePedido,
		deletePedido
	};
}
