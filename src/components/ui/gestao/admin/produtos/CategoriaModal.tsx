"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/common/Modal";
import FormInput from "@/components/common/FormInput";

interface Categoria {
	id: string;
	nome: string;
	descricao?: string;
}

const categoriaSchema = z.object({
	nome: z.string().min(2, "Nome muito curto").max(100, "Nome muito longo"),
});

type CategoriaSchema = z.infer<typeof categoriaSchema>;

interface CategoriaModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: CategoriaSchema) => void;
	categoria?: Categoria;
	isLoading?: boolean;
}

export default function CategoriaModal({
	isOpen,
	onClose,
	onSubmit,
	categoria,
	isLoading,
}: CategoriaModalProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CategoriaSchema>({
		resolver: zodResolver(categoriaSchema),
		defaultValues: {
			nome: categoria?.nome || "",
		},
	});

	const handleClose = () => {
		reset();
		onClose();
	};

	const handleFormSubmit = (data: CategoriaSchema) => {
		onSubmit(data);
		reset();
	};

	return (
		<Modal open={isOpen} onBackdropClick={handleClose}>
			<div className="bg-item rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
				{/* Header */}
				<div className="px-6 py-4 border-b border-foreground/10">
					<h2 className="text-xl font-bold text-foreground">
						{categoria ? "Editar Categoria" : "Nova Categoria"}
					</h2>
				</div>

				{/* Body */}
				<div className="p-6">
					<form id="categoria-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
						<FormInput
							label="Nome da Categoria"
							name="nome"
							placeholder="Ex: Eletrônicos"
							register={register}
							error={errors.nome}
						/>
					</form>
				</div>

				{/* Footer */}
				<div className="px-6 py-4 bg-background/30 border-t border-foreground/10 flex justify-end gap-3">
					<button
						type="button"
						onClick={handleClose}
						className="px-4 py-2 rounded-xl font-medium text-foreground/70 hover:bg-foreground/5 transition-all duration-200 active:scale-[0.98]"
					>
						Cancelar
					</button>
					<button
						type="submit"
						form="categoria-form"
						disabled={isLoading}
						className="px-6 py-2 rounded-xl font-semibold bg-secondary/75 hover:bg-secondary/90 transition-all duration-300 disabled:bg-secondary/40 disabled:cursor-not-allowed active:scale-[0.98]"
					>
						{isLoading ? "Salvando..." : "Salvar"}
					</button>
				</div>
			</div>
		</Modal>
	);
}
