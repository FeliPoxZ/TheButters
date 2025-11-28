import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const toPrice = (price: number) => {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(price);
};

export const isDev = process.env.NODE_ENV === "development";

export function getToken() {
	return document.cookie
		.split("; ")
		.find((row) => row.startsWith("token="))
		?.split("=")[1];
}

export function transformApiResponse(data: ApiProduct[] | null): Category[] | null {
	if (!data) return null;

	const map = new Map<string, Category>();

	data.forEach(({ categoria, produto }) => {
		if (!map.has(categoria.id)) {
			map.set(categoria.id, {
				id: categoria.id,
				nome: categoria.nome,
				descricao: categoria.descricao,
				produtos: [],
			});
		}

		map.get(categoria.id)!.produtos.push(produto);
	});

	return Array.from(map.values());
}
