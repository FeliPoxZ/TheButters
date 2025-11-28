"use client";

import { Pencil, Trash2, Store } from "lucide-react";

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

interface ProdutoCardProps {
	produto: Produto;
	categoria?: Categoria;
	lojas: Loja[];
	onEdit: (produto: Produto) => void;
	onDelete: (produtoId: string) => void;
	onRemoveFromLoja: (produtoId: string, lojaId: string) => void;
}

export default function ProdutoCard({
	produto,
	categoria,
	lojas,
	onEdit,
	onDelete,
	onRemoveFromLoja,
}: ProdutoCardProps) {
	const produtoLojas = lojas.filter((loja) => produto.lojaIds.includes(loja.id));

	return (
		<div className="bg-item rounded-xl shadow-md p-5 border border-foreground/5 hover:shadow-lg transition-shadow duration-300">
			<div className="flex items-start justify-between mb-3">
				<div className="flex-1">
					<h3 className="text-lg font-semibold text-foreground mb-1">{produto.nome}</h3>
					{categoria && (
						<span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
							{categoria.nome}
						</span>
					)}
				</div>
				<div className="flex gap-2">
					<button
						onClick={() => onEdit(produto)}
						className="p-2 rounded-lg hover:bg-highlight/20 text-primary transition-colors active:scale-95"
						title="Editar produto"
					>
						<Pencil className="w-4 h-4" />
					</button>
					<button
						onClick={() => onDelete(produto.id)}
						className="p-2 rounded-lg hover:bg-soft-red/20 text-soft-red transition-colors active:scale-95"
						title="Excluir produto"
					>
						<Trash2 className="w-4 h-4" />
					</button>
				</div>
			</div>

			{produto.descricao && (
				<p className="text-sm text-foreground/70 mb-3 line-clamp-2">{produto.descricao}</p>
			)}

			<div className="flex items-center justify-between mb-3 pb-3 border-b border-foreground/10">
				<span className="text-xl font-bold text-secondary">R$ {produto.preco.toFixed(2)}</span>
			</div>

			<div>
				<div className="flex items-center gap-1.5 mb-2">
					<Store className="w-4 h-4 text-foreground/60" />
					<span className="text-xs font-medium text-foreground/70">
						Lojas ({produtoLojas.length})
					</span>
				</div>
				{produtoLojas.length > 0 ? (
					<div className="flex flex-wrap gap-1.5">
						{produtoLojas.map((loja) => (
							<div
								key={loja.id}
								className="group flex items-center gap-1.5 px-2.5 py-1 text-xs bg-background/50 rounded-lg border border-foreground/10"
							>
								<span className="text-foreground/80">{loja.nome}</span>
								<button
									onClick={() => onRemoveFromLoja(produto.id, loja.id)}
									className="opacity-0 group-hover:opacity-100 transition-opacity text-soft-red hover:text-on-soft-red active:scale-90"
									title="Remover desta loja"
								>
									<Trash2 className="w-3 h-3" />
								</button>
							</div>
						))}
					</div>
				) : (
					<p className="text-xs text-foreground/50 italic">Não atribuído a nenhuma loja</p>
				)}
			</div>
		</div>
	);
}
