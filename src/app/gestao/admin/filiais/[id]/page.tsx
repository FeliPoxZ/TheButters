"use client";

import { useParams, useRouter } from "next/navigation";
import { useLoja, useUpdateLoja, useDeleteLoja } from "@/hooks/queries/useLojas";
import LojaForm from "@/components/ui/gestao/admin/filiais/FilialForm";

export default function EditFilialPage() {
	const { id } = useParams();
	const router = useRouter();

	const { data } = useLoja(id as string);
	const updateMutation = useUpdateLoja(id as string);
	const deleteMutation = useDeleteLoja(id as string);

	async function update(values: any) {
		await updateMutation.mutateAsync(values);
		router.push("/gestao/admin/filiais");
	}

	async function remove() {
		if (confirm("Deseja excluir esta filial?")) {
			await deleteMutation.mutateAsync();
			router.push("/gestao/admin/filiais");
		}
	}

	if (!data) return <p className="px-8 py-10">Carregando...</p>;

	return (
		<div className="px-8 py-10">
			<h1 className="text-2xl font-bold mb-6">Editar Filial</h1>

			<LojaForm
				defaultValues={{
					cnpj: data.cnpj,
					nome: data.nome,
					enderecoid: data.endereco?.id,
				}}
				isUpdate
				onSubmit={update}
				submitText="Salvar Alterações"
			/>

			<button onClick={remove} className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg w-full">
				Excluir Filial
			</button>
		</div>
	);
}
