import { LojaCreateInput, LojaUpdateInput } from "@/schemas/lojaSchema";
import LojaClient from "@/services/LojaClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { toast } from "react-toastify";

const lojaClient = new LojaClient();

export function useLojas() {
	return useQuery({
		queryKey: ["lojas"],
		queryFn: async () => {
			const data = await lojaClient.getAll();
			return data;
		},
	});
}

export function useLoja(id: string) {
	return useQuery({
		queryKey: ["loja", id],
		enabled: !!id,
		queryFn: async () => {
			const data = await lojaClient.get(id);
			return data;
		},
	});
}

export function useCreateLoja() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: async (input: LojaCreateInput) => {
			const data = await lojaClient.create(input);
			console.log(data);
			return data;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["lojas"] });
		},
	});
}

export function useUpdateLoja(id: string) {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: async (input: LojaUpdateInput) => {
			const data = await lojaClient.update(input, id);
			return data;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["lojas"] });
			qc.invalidateQueries({ queryKey: ["loja", id] });
		},
	});
}

export function useDeleteLoja(id: string) {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			await lojaClient.delete(id);
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["lojas"] });
			toast.info("Filial Removida", { autoClose: ms("4s") });
		},
	});
}
