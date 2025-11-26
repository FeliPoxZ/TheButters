"use client";

import { useLojas } from "@/hooks/queries/useLojas";
import Link from "next/link";

export default function LojasPage() {
	const { data, isLoading } = useLojas();

	return (
		<div className="px-8 py-10">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-foreground">Filiais</h2>

				<Link
					href="/gestao/admin/filiais/novo"
					className="px-4 py-2 bg-primary text-white rounded-lg"
				>
					Nova Filial
				</Link>
			</div>

			{isLoading && <p>Carregando...</p>}

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{data?.map((loja) => (
					<Link
						key={loja.id}
						href={`/gestao/admin/filiais/${loja.id}`}
						className="bg-item p-4 rounded-xl border border-banner/40 hover:opacity-80"
					>
						<h3 className="text-lg font-bold">{loja.nome}</h3>

						<p className="text-sm text-foreground/70">
							{loja.endereco?.rua}, {loja.endereco?.numero} — {loja.endereco?.cidade}
						</p>

						<p className="mt-2 text-xs">{loja.cnpj}</p>
					</Link>
				))}
			</div>
		</div>
	);
}
