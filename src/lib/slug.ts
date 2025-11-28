import { LojaResponse } from "@/schemas/lojaSchema";

export function formatSlugFromLoja(loja: LojaResponse) {
	const rua = loja.endereco?.rua ?? "";
	const numero = loja.endereco?.numero ?? "";
	const cidade = loja.endereco?.cidade ?? "";
	// const estado = loja.endereco?.estado ?? ""; // Ex: "São Paulo"

	// Remover acentos + transformar em slug
	const slugify = (text: string) =>
		text
			.normalize("NFD")                  // separa acentos
			.replace(/[\u0300-\u036f]/g, "")   // remove acentos
			.replace(/[^\w\s-]/g, "")          // remove caracteres especiais
			.trim()
			.replace(/\s+/g, "-")              // espaço → hífen
			.toLowerCase();

	const slugRua = slugify(rua);
	const slugCidade = slugify(cidade);

	return `${slugRua}-${numero}-${slugCidade}`;
}
