import { LojaCreateInput, LojaResponse, LojaUpdateInput } from "@/schemas/lojaSchema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useLojas() {
	return useQuery({
		queryKey: ["lojas"],
		queryFn: async () => {
			const { data } = await axios.get<LojaResponse[]>("/lojas");
			return data;
		},
	});
}

export function useLoja(id: string | undefined) {
	return useQuery({
		queryKey: ["loja", id],
		enabled: !!id,
		queryFn: async () => {
			const { data } = await axios.get<LojaResponse>(`/lojas/${id}`);
			return data;
		},
	});
}

export function useCreateLoja() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: async (input: LojaCreateInput) => {
			const { data } = await axios.post("/lojas", input);
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
			const { data } = await axios.put(`/lojas/${id}`, input);
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
			await axios.delete(`/lojas/${id}`);
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["lojas"] });
		},
	});
}
