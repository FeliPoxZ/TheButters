"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/common/Modal";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import FormInput from "@/components/common/FormInput";
import { useState } from "react";

interface Produto {
	id: string;
	nome: string;
	descricao?: string;
	preco: number;
	categoriaId: string;
	lojaIds: string[];
}

interface Categoria {
	id: string;
	nome: string;
	descricao?: string;
}

interface Loja {
	id: string;
	nome: string;
}

const produtoSchema = z.object({
	nome: z.string().min(2, "Nome muito curto").max(100, "Nome muito longo"),
	descricao: z.string().max(500, "Descrição muito longa").optional(),
	preco: z.coerce.number().min(0, "Preço deve ser maior que 0"),
	categoriaId: z.string().min(1, "Selecione uma categoria"),
});

type ProdutoSchema = z.infer<typeof produtoSchema>;

interface ProdutoModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: ProdutoSchema & { lojaIds: string[] }) => void;
	produto?: Produto;
	categorias: Categoria[];
	lojas: Loja[];
	isLoading?: boolean;
}

export default function ProdutoModal({
	isOpen,
	onClose,
	onSubmit,
	produto,
	categorias,
	lojas,
	isLoading,
}: ProdutoModalProps) {
	const [selectedLojas, setSelectedLojas] = useState<string[]>(produto?.lojaIds || []);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<ProdutoSchema>({
		resolver: zodResolver(produtoSchema),
		defaultValues: {
			nome: produto?.nome || "",
			descricao: produto?.descricao || "",
			preco: produto?.preco || 0,
			categoriaId: produto?.categoriaId || "",
		},
	});

	const handleClose = () => {
		reset();
		setSelectedLojas([]);
		onClose();
	};

	const handleFormSubmit = (data: ProdutoSchema) => {
		onSubmit({ ...data, lojaIds: selectedLojas });
		reset();
		setSelectedLojas([]);
	};

	const toggleLoja = (lojaId: string) => {
		setSelectedLojas((prev) =>
			prev.includes(lojaId) ? prev.filter((id) => id !== lojaId) : [...prev, lojaId]
		);
	};

	return (
		<Modal open={isOpen} onBackdropClick={handleClose}>
			<div className="bg-item rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
				{/* Header */}
				<div className="px-6 py-4 border-b border-foreground/10">
					<h2 className="text-xl font-bold text-foreground">
						{produto ? "Editar Produto" : "Novo Produto"}
					</h2>
				</div>

				{/* Body - Scrollable */}
				<div className="p-6 overflow-y-auto flex-1">
					<form id="produto-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
						<FormInput
							label="Nome do Produto"
							name="nome"
							placeholder="Ex: Notebook Dell"
							register={register}
							error={errors.nome}
						/>

						<div>
							<label className="block text-sm font-medium text-foreground/90 mb-1.5">
								Descrição
							</label>
							<textarea
								placeholder="Descreva o produto..."
								{...register("descricao")}
								className="w-full px-3 py-2.5 rounded-xl border border-foreground/20 text-foreground bg-background/50 placeholder:text-foreground/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px] resize-none"
							/>
							{errors.descricao && (
								<p className="mt-1.5 text-xs text-soft-red">{errors.descricao.message}</p>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormInput
								label="Preço"
								name="preco"
								type="number"
								placeholder="0.00"
								register={register}
								error={errors.preco}
							/>

							<div>
								<label className="block text-sm font-medium text-foreground/90 mb-1.5">
									Categoria <span className="text-soft-red ml-1">*</span>
								</label>
								<Controller
									name="categoriaId"
									control={control}
									render={({ field }) => (
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger className="w-full h-10 bg-background/50 border-foreground/20 text-foreground">
												<SelectValue placeholder="Selecione uma categoria" />
											</SelectTrigger>
											<SelectContent className="bg-item border-foreground/10">
												{categorias.map((cat) => (
													<SelectItem key={cat.id} value={cat.id} className="text-foreground">
														{cat.nome}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								/>
								{errors.categoriaId && (
									<p className="mt-1.5 text-xs text-soft-red">{errors.categoriaId.message}</p>
								)}
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-foreground/90 mb-2">
								Lojas <span className="text-foreground/50 text-xs">(selecione uma ou mais)</span>
							</label>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-3 rounded-xl bg-background/30 border border-foreground/10">
								{lojas.length === 0 ? (
									<p className="text-sm text-foreground/50 col-span-2">Nenhuma loja disponível</p>
								) : (
									lojas.map((loja) => (
										<label
											key={loja.id}
											className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 cursor-pointer transition-colors"
										>
											<input
												type="checkbox"
												checked={selectedLojas.includes(loja.id)}
												onChange={() => toggleLoja(loja.id)}
												className="w-4 h-4 rounded border-foreground/30 text-primary focus:ring-primary/50"
											/>
											<span className="text-sm text-foreground">{loja.nome}</span>
										</label>
									))
								)}
							</div>
						</div>
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
						form="produto-form"
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
