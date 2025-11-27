"use client";

import { useParams, useRouter } from "next/navigation";
import { useLoja, useUpdateLoja, useDeleteLoja } from "@/hooks/queries/useLojas";
import { useForm } from "react-hook-form";
import { LojaUpdateInput, lojaUpdateSchema } from "@/schemas/lojaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/common/FormInput";

export default function EditFilialPage() {
	const { id } = useParams();
	const router = useRouter();

	const { data } = useLoja(id as string);
	const updateMutation = useUpdateLoja(id as string);
	const deleteMutation = useDeleteLoja(id as string);

	const { register, handleSubmit, formState } = useForm<LojaUpdateInput>({
		resolver: zodResolver(lojaUpdateSchema),
		defaultValues: {
			cnpj: data?.cnpj,
			nome: data?.nome,
			enderecoid: data?.endereco?.id,
		},
	});

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

			<form
				onSubmit={handleSubmit(update)}
				className="space-y-4 max-w-lg bg-item p-6 rounded-xl border border-banner/30"
			>
				<FormInput label="Nome" name="nome" register={register} error={formState.errors.nome} />
				<FormInput label="CNPJ" name="cnpj" register={register} error={formState.errors.cnpj} />

				<FormInput
					label="ID do Endereço"
					name="enderecoid"
					register={register}
					error={formState.errors.enderecoid}
				/>

				<button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg w-full mt-4">
					Salvar alterações
				</button>
			</form>

			<button onClick={remove} className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg w-full">
				Excluir Filial
			</button>
		</div>
	);
}
