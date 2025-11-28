import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Categoria } from "@/store/products-store";

// Hook para buscar todas as categorias
export function useGetCategorias() {
	return useQuery({
		queryKey: ["categorias"],
		queryFn: async () => {
			// TODO: Implementar chamada à API
			// const response = await fetch('/api/categorias');
			// return response.json();
			return [] as Categoria[];
		},
	});
}

// Hook para criar categoria
export function useCreateCategoria() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: Omit<Categoria, "id">) => {
			// TODO: Implementar chamada à API
			// const response = await fetch('/api/categorias', {
			//   method: 'POST',
			//   body: JSON.stringify(data),
			// });
			// return response.json();
			return data as Categoria;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categorias"] });
		},
	});
}

// Hook para atualizar categoria
export function useUpdateCategoria() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, data }: { id: string; data: Partial<Categoria> }) => {
			// TODO: Implementar chamada à API
			// const response = await fetch(`/api/categorias/${id}`, {
			//   method: 'PATCH',
			//   body: JSON.stringify(data),
			// });
			// return response.json();
			return { id, ...data } as Categoria;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categorias"] });
		},
	});
}
