import { use } from "react";
import { notFound } from "next/navigation";
import LojaClient from "@/services/LojaClient";
import { formatSlugFromLoja } from "@/lib/slug";
import { InjectLojaId } from "./InjectLojaId";

type SlugLayoutProps = {
	params: Promise<{ slug: string }>; 
	children: React.ReactNode;
};

export default function SlugLayout({ params, children }: SlugLayoutProps) {
	const { slug } = use(params);

	// Modo DEV → permitir /dev sem checar banco
	if (process.env.NODE_ENV === "development" && slug === "dev") {
		return <>{children}</>;
	}

	return (
		<>
			<SlugResolver slug={slug}>{children}</SlugResolver>
		</>
	);
}

async function SlugResolver({ slug, children }: { slug: string; children: React.ReactNode }) {
	const lojaClient = new LojaClient();
	const lojas = await lojaClient.getAll();

	if (!lojas) notFound();

	const loja = lojas.find((loja) => formatSlugFromLoja(loja) === slug);

	if (!loja) notFound();

	return (
		<>
			<InjectLojaId lojaId={loja.id} />
			{children}
		</>
	);
}
