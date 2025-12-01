import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
	categoriaSchema,
	categoriaCreateSchema,
	categoriaUpdateSchema,
	CategoriaCreateSchema,
	CategoriaUpdateSchema,
} from "@/schemas/categoriaSchema";
import CategoriaClient from "@/services/CategoriaClient";

const categoriaClient = new CategoriaClient()

// GET todas categorias
export const useCategorias = () =>
	useQuery({
		queryKey: ["categorias"],
		queryFn: async () => {
			const res = await categoriaClient.getAll();
			return z.array(categoriaSchema).parse(res);
		},
	});

// CREATE categoria
export const useCreateCategoria = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: CategoriaCreateSchema) => {
			const res = await categoriaClient.create(data);
			return categoriaSchema.parse(res);
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categorias"] }),
	});
};

// UPDATE categoria
export const useUpdateCategoria = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (params: {data: CategoriaUpdateSchema, id:string}) => {
			const res = await categoriaClient.update(params.id, params.data);
			return categoriaSchema.parse(res);
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categorias"] }),
	});
};
