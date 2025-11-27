"use client";

import { useRouter } from "next/navigation";
import { useCreateLoja } from "@/hooks/queries/useLojas";
import { LojaCreateInput, lojaCreateSchema } from "@/schemas/lojaSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/common/FormInput";

export default function NovaFilialPage() {
	const router = useRouter();
	const mutation = useCreateLoja();

	const { register, handleSubmit, formState } = useForm<LojaCreateInput>({
		resolver: zodResolver(lojaCreateSchema),
	});

	async function submit(values: any) {
		await mutation.mutateAsync(values);
		router.push("/gestao/admin/filiais");
	}

	return (
		<div className="px-8 py-10">
			<h1 className="text-2xl font-bold mb-6">Nova Filial</h1>
			<form
				onSubmit={handleSubmit(submit)}
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
					Criar Filial
				</button>
			</form>
		</div>
	);
}
