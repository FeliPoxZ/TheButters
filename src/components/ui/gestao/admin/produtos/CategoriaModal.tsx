import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/common/Modal";
import FormInput from "@/components/common/FormInput";
import { categoriaCreateSchema, CategoriaCreateSchema, CategoriaSchema } from "@/schemas/categoriaSchema"; // Importa o schema correto para criação
import { useEffect } from "react";

interface CategoriaModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: CategoriaCreateSchema) => void; // Tipo atualizado para categoriaCreateSchema
	categoria?: CategoriaSchema;
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
	} = useForm<CategoriaCreateSchema>({
		resolver: zodResolver(categoriaCreateSchema), // Usando o schema de criação
		defaultValues: { nome: "", descricao: "" }, // Defina valores padrão
	});

	// Atualizar o formulário ao abrir o modal
	useEffect(() => {
		if (categoria) {
			reset({ nome: categoria.nome, descricao: categoria.descricao }); // Preencher os dados existentes
		} else {
			reset({ nome: "", descricao: "" });
		}
	}, [categoria, reset, isOpen]);

	const handleClose = () => {
		reset();
		onClose();
	};

	const handleSubmitForm = (data: CategoriaCreateSchema) => {
		console.log("[CategoriaModal] handleSubmit ->", data); // Adicionei log aqui para verificar
		onSubmit(data);
	};

	return (
		<Modal open={isOpen} onBackdropClick={handleClose}>
			<div className="bg-item rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
				<div className="px-6 py-4 border-b border-foreground/10">
					<h2 className="text-xl font-bold text-foreground">
						{categoria ? "Editar Categoria" : "Nova Categoria"}
					</h2>
				</div>

				<div className="p-6">
					<form
						id="categoria-form"
						onSubmit={handleSubmit(handleSubmitForm)} // Chamando o handleSubmit
						className="space-y-4"
					>
						<FormInput
							label="Nome da Categoria"
							name="nome"
							placeholder="Ex: Bebidas"
							register={register}
							error={errors.nome} // Exibindo mensagem de erro se houver
						/>
						<FormInput
							label="Descrição"
							name="descricao"
							placeholder="Descrição da categoria"
							register={register}
							error={errors.descricao} // Exibindo erro para descrição
						/>
					</form>
				</div>

				<div className="px-6 py-4 bg-background/30 border-t border-foreground/10 flex justify-end gap-3">
					<button
						type="button"
						onClick={handleClose}
						className="px-4 py-2 rounded-xl font-medium text-foreground/70 hover:bg-foreground/5"
					>
						Cancelar
					</button>
					<button
						type="submit"
						form="categoria-form"
						disabled={isLoading}
						className="px-6 py-2 rounded-xl font-semibold bg-secondary/75 hover:bg-secondary/90 disabled:bg-secondary/40"
					>
						{isLoading ? "Salvando..." : "Salvar"}
					</button>
				</div>
			</div>
		</Modal>
	);
}
