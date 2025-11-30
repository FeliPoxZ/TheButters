import { Produto } from "@/stores/products-store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


// Hook para buscar todos os produtos
export function useGetProducts() {
	return useQuery({
		queryKey: ["produtos"],
		queryFn: async () => {
			// TODO: Implementar chamada à API
			// const response = await fetch('/api/produtos');
			// return response.json();
			return [] as Produto[];
		},
	});
}

// Hook para buscar produtos de uma loja específica
export function useGetProductsByLoja(lojaId: string) {
	return useQuery({
		queryKey: ["produtos", "loja", lojaId],
		queryFn: async () => {
			// TODO: Implementar chamada à API
			// const response = await fetch(`/api/produtos?lojaId=${lojaId}`);
			// return response.json();
			return [] as Produto[];
		},
		enabled: !!lojaId,
	});
}

// Hook para criar produto
export function useCreateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: Omit<Produto, "id" | "createdAt">) => {
			// TODO: Implementar chamada à API
			// const response = await fetch('/api/produtos', {
			//   method: 'POST',
			//   body: JSON.stringify(data),
			// });
			// return response.json();
			return data as Produto;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["produtos"] });
		},
	});
}

// Hook para atualizar produto
export function useUpdateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, data }: { id: string; data: Partial<Produto> }) => {
			// TODO: Implementar chamada à API
			// const response = await fetch(`/api/produtos/${id}`, {
			//   method: 'PATCH',
			//   body: JSON.stringify(data),
			// });
			// return response.json();
			return { id, ...data } as Produto;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["produtos"] });
		},
	});
}

// Hook para deletar produto
export function useDeleteProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			// TODO: Implementar chamada à API
			// await fetch(`/api/produtos/${id}`, { method: 'DELETE' });
			return id;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["produtos"] });
		},
	});
}

// Hook para remover produto de uma loja
export function useRemoveProductFromLoja() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ produtoId, lojaId }: { produtoId: string; lojaId: string }) => {
			// TODO: Implementar chamada à API
			// await fetch(`/api/produtos/${produtoId}/lojas/${lojaId}`, {
			//   method: 'DELETE',
			// });
			return { produtoId, lojaId };
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["produtos"] });
		},
	});
}
