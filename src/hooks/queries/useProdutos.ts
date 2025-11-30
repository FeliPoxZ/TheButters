import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { produtoSchema, ProdutoCreateSchema, ProdutoUpdateSchema } from "@/schemas/produtoSchema";
import ProdutoClient from "@/services/ProdutoClient";

const produtoClient = new ProdutoClient()

// GET produtos de uma loja
export const useProdutosByLoja = (lojaId?: string) =>
	useQuery({
		queryKey: ["produtos", lojaId],
		queryFn: async () => {
			if (!lojaId) return [];
			const res = await produtoClient.getAllByLoja(lojaId);
			return res;
		},
		enabled: !!lojaId, // só roda se lojaId existir
	});

// CREATE produto
export const useCreateProduto = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: ProdutoCreateSchema) => {
			const res = await produtoClient.create(data);
			return produtoSchema.parse(res);
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["produtos"] }),
	});
};

// UPDATE produto
export const useUpdateProduto = (id: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: ProdutoUpdateSchema) => {
			const res = await produtoClient.update(id, data);
			return produtoSchema.parse(res);
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["produtos"] }),
	});
};

// ADD produto à loja
export const useAddProdutoLoja = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: { produtoid: string; lojaid: string }) => {
			return produtoClient.addToLoja(payload.produtoid, payload.lojaid);
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["produtos"] }),
	});
};

// BULK add produtos
export const useAddProdutosLojaBulk = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: { lojaprodutos: { produtoid: string; lojaid: string }[] }) => {
			return produtoClient.addToLojaBulk(payload.lojaprodutos);
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["produtos"] }),
	});
};
