"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	lojaCreateSchema,
	LojaCreateInput,
	LojaUpdateInput,
	lojaUpdateSchema,
} from "@/schemas/lojaSchema";
import FormInput from "@/components/common/FormInput";

type Props = {
	isUpdate?: boolean;
	defaultValues?: Partial<LojaCreateInput>;
	onSubmit: (v: LojaCreateInput | LojaUpdateInput) => void;
	submitText: string;
};

export default function LojaForm({ isUpdate = false, defaultValues, onSubmit, submitText }: Props) {
	const { register, handleSubmit, formState } = useForm<LojaCreateInput | LojaUpdateInput>({
		resolver: zodResolver(isUpdate ? lojaUpdateSchema : lojaCreateSchema),
		defaultValues,
	});

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
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
				{submitText}
			</button>
		</form>
	);
}
