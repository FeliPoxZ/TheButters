"use client";

import { useRouter } from "next/navigation";

import { useCreateLoja } from "@/hooks/queries/useLojas";
import LojaForm from "@/components/ui/gestao/admin/filiais/FilialForm";

export default function NovaFilialPage() {
	const router = useRouter();
	const mutation = useCreateLoja();

	async function submit(values: any) {
		await mutation.mutateAsync(values);
		router.push("/gestao/admin/filiais");
	}

	return (
		<div className="px-8 py-10">
			<h1 className="text-2xl font-bold mb-6">Nova Filial</h1>

			<LojaForm onSubmit={submit} submitText="Criar Filial" />
		</div>
	);
}
