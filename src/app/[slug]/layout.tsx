import { ReactNode } from "react";
import { notFound } from "next/navigation";

export default async function SlugLayout({
	params,
	children,
}: {
	params: { slug: string };
	children: ReactNode;
}) {
	const { slug } = await params;

	const isDev = process.env.NODE_ENV === "development";

	// 👉 Em modo DEV, liberar o slug "dev" sem buscar no banco
	if (isDev && slug === "dev") {
		return <>{children}</>;
	}

	// 👉 Em qualquer ambiente, buscar loja real
	const loja = null;

	// Se não existir, 404
	if (!loja) {
		notFound();
	}

	// Se existir, renderiza normalmente
	return <>{children}</>;
}
