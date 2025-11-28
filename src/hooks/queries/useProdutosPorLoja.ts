import { transformApiResponse } from "@/lib/utils";
import ProdutoClient from "@/services/ProdutoClient";
import { useQuery } from "@tanstack/react-query";

const produtoClient = new ProdutoClient()

export function useProdutosPorLoja(lojaId: string | null) {
	return useQuery({
		enabled: !!lojaId,
		queryKey: ["produtos-por-loja", lojaId],
		queryFn: async () => {
			return produtoClient.getAllByLoja(lojaId!); 
		},
		select: (data) => transformApiResponse(data), 
	});
}
