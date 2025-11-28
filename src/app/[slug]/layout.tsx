import { ReactNode } from "react";
import { notFound } from "next/navigation";
import LojaClient from "@/services/LojaClient";
import { formatSlugFromLoja } from "@/lib/slug";
import { InjectLojaId } from "./InjectLojaId";
import QueryProvider from "@/components/common/QueryProvider";

export default async function SlugLayout({
	params,
	children,
}: {
	params: { slug: string };
	children: ReactNode;
}) {
	const { slug } = await params;

	// Modo DEV → permitir /dev sem checar banco
	if (process.env.NODE_ENV === "development" && slug === "dev") {
		return <QueryProvider>{children}</QueryProvider>;
	}

	const lojaClient = new LojaClient();
	const lojas = await lojaClient.getAll();

	if (!lojas) notFound();

	// Encontrar a loja cujo slug gerado bate com o slug da URL
	const loja = lojas.find((loja) => {
		const verifySlug = formatSlugFromLoja(loja);
		return verifySlug === slug;
	});

	if (!loja) notFound();

	return (
		<QueryProvider>
			<InjectLojaId lojaId={loja.id} />
			{children}
		</QueryProvider>
	);
}
