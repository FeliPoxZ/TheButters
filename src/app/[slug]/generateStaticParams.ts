import { formatSlugFromLoja } from "@/lib/slug";
import LojaClient from "@/services/LojaClient";


export async function generateStaticParams() {
	const lojaClient = new LojaClient();
	const lojas = await lojaClient.getAll();

	if (!lojas) return [];

	return lojas.map((loja) => ({
		slug: formatSlugFromLoja(loja),
	}));
}
