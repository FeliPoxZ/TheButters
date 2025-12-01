"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, Package, Tag, Filter } from "lucide-react";
import CommonHeader from "@/components/common/CommonHeader";
import ProdutoCard from "@/components/ui/gestao/admin/produtos/ProdutoCard";
import ProdutoModal from "@/components/ui/gestao/admin/produtos/ProdutoModal";
import CategoriaModal from "@/components/ui/gestao/admin/produtos/CategoriaModal";
import CommonFooter from "@/components/common/CommonFooter";
import ExtraHeader from "@/components/ui/gestao/ExtraHeader";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	useCategorias,
	useCreateCategoria,
	useUpdateCategoria,
} from "@/hooks/queries/useCategorias";
import { useLojas } from "@/hooks/queries/useLojas";
import ProdutoClient from "@/services/ProdutoClient";
import {
	CategoriaCreateSchema,
	CategoriaSchema,
	CategoriaUpdateSchema,
} from "@/schemas/categoriaSchema";

// TODO: Integração com query

const produtoClient = new ProdutoClient();

export default function ProdutosPage() {
	const [produtoModalOpen, setProdutoModalOpen] = useState(false);
	const [categoriaModalOpen, setCategoriaModalOpen] = useState(false);
	const [editingProduto, setEditingProduto] = useState<Product | null>(null);
	const [editingCategoria, setEditingCategoria] = useState<CategoriaSchema | null>(null);

	const [filterLojaId, setFilterLojaId] = useState<string>("all");
	const [filterCategoriaId, setFilterCategoriaId] = useState<string>("all");

	const [apiProdutos, setApiProdutos] = useState<ApiProduct[]>([]);
	const [loadingProdutos, setLoadingProdutos] = useState<boolean>(false);

	// Queries
	const { data: categorias = [] } = useCategorias();
	const { data: lojas = [] } = useLojas();
	const { mutate: createCategoria, isPending: creatingCategoria } = useCreateCategoria();
	const { mutate: updateCategoria, isPending: updatingCategoria } = useUpdateCategoria();

	useEffect(() => {
		const fetchProdutos = async () => {
			if (!lojas) return;

			setLoadingProdutos(true);
			try {
				if (filterLojaId === "all") {
					const results = await Promise.all(
						lojas.map((loja) => produtoClient.getAllByLoja(loja.id))
					);
					// filter nulls
					const merged = results.flat().filter((p): p is ApiProduct => p !== null);
					setApiProdutos(merged);
				} else {
					const data = await produtoClient.getAllByLoja(filterLojaId);
					setApiProdutos(data ?? []);
				}
			} catch (err) {
				console.error("Erro ao buscar produtos:", err);
			} finally {
				setLoadingProdutos(false);
			}
		};

		fetchProdutos();
	}, [filterLojaId, lojas]);

	// Converte ApiProduct → Product
	const produtos: Product[] = useMemo(() => {
		return (apiProdutos ?? []).map((item) => ({
			id: item.produto.id,
			nome: item.produto.nome,
			descricao: item.produto.descricao,
			preco: item.produto.preco,
			imagemc: item.produto.imagemc,
			categoriaId: item.categoria.id,
			lojaIds: filterLojaId === "all" ? lojas!.map((l) => l.id) : [filterLojaId],
		}));
	}, [apiProdutos, filterLojaId, lojas]);

	const filteredProdutos = useMemo(() => {
		return produtos.filter((produto) => {
			const categoriaMatch =
				filterCategoriaId === "all" || produto.categoriaId === filterCategoriaId;
			return categoriaMatch;
		});
	}, [produtos, filterCategoriaId]);

	const openNovoProdutoModal = () => {
		setEditingProduto(null);
		setProdutoModalOpen(true);
	};

	const openProdutoModal = (produto: Product) => {
		setEditingProduto(produto);
		setProdutoModalOpen(true);
	};

	const openCategoriaModal = (categoria?: CategoriaSchema) => {
		setEditingCategoria(categoria || null);
		setCategoriaModalOpen(true);
	};

	const handleCategoriaSubmit = (data: CategoriaCreateSchema) => {
		console.log(
			"[ProdutosPage] handleCategoriaSubmit called with:",
			data,
			"editingCategoria:",
			editingCategoria
		);
		/* if (editingCategoria) {
			updateCategoria(
				{ data: { nome: data.nome, descricao: data.descricao }, id: data.id },
				{
					onSuccess: () => {
						setCategoriaModalOpen(false);
						setEditingCategoria(null);
					},
				}
			);
		} else { */
		createCategoria(data, {
			onSuccess: () => {
				console.log("[ProdutosPage] createCategoria success");
				setCategoriaModalOpen(false);
			},
			onError: (err: any) => {
				console.error("[ProdutosPage] createCategoria error:", err);
			},
		});
		/* } */
	};

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-7xl mx-auto px-4 py-6">
				<div className="bg-item rounded-2xl shadow-md overflow-hidden mb-6">
					<CommonHeader extra={<ExtraHeader />} />
					<div className="p-6">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
							<div>
								<h2 className="text-2xl font-bold text-foreground/90 mb-1">Gerenciar Produtos</h2>
								<p className="text-sm text-foreground/70">
									Gerencie produtos, categorias e atribuições de lojas
								</p>
							</div>
							<div className="flex flex-wrap gap-2">
								<button
									onClick={() => openCategoriaModal()}
									className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold bg-primary/80 hover:bg-primary transition-all duration-300 text-white shadow-sm active:scale-[0.98]"
								>
									<Tag className="w-4 h-4" />
									<span>Nova Categoria</span>
								</button>
								<button
									onClick={() => openNovoProdutoModal()}
									className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold bg-secondary/75 hover:bg-secondary/90 transition-all duration-300 shadow-sm active:scale-[0.98]"
								>
									<Plus className="w-4 h-4" />
									<span>Novo Produto</span>
								</button>
							</div>
						</div>

						{/* Filtros */}
						<div className="mt-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
							<div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
								<Filter className="w-4 h-4" />
								<span>Filtrar por:</span>
							</div>

							<Select value={filterLojaId} onValueChange={setFilterLojaId}>
								<SelectTrigger className="w-full sm:w-[200px] bg-background/50 border-foreground/20 text-foreground">
									<SelectValue placeholder="Todas as lojas" />
								</SelectTrigger>
								<SelectContent className="bg-item border-foreground/10">
									<SelectItem value="all" className="text-foreground">
										Todas as lojas
									</SelectItem>
									{lojas?.map((loja) => (
										<SelectItem key={loja.id} value={loja.id} className="text-foreground">
											{loja.nome}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select value={filterCategoriaId} onValueChange={setFilterCategoriaId}>
								<SelectTrigger className="w-full sm:w-[200px] bg-background/50 border-foreground/20 text-foreground">
									<SelectValue placeholder="Todas as categorias" />
								</SelectTrigger>
								<SelectContent className="bg-item border-foreground/10">
									<SelectItem value="all" className="text-foreground">
										Todas as categorias
									</SelectItem>
									{categorias.map((cat) => (
										<SelectItem key={cat.id} value={cat.id} className="text-foreground">
											{cat.nome}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				{/* Produtos */}
				{loadingProdutos ? (
					<div className="text-center p-12 text-foreground/70">Carregando produtos...</div>
				) : filteredProdutos.length === 0 ? (
					<div className="bg-item rounded-2xl shadow-md p-12 text-center">
						<Package className="w-16 h-16 text-foreground/90 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-foreground/70 mb-2">
							Nenhum produto encontrado
						</h3>
						<p className="text-sm text-foreground/50 mb-6">Tente ajustar os filtros</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
						{filteredProdutos.map((produto) => (
							<ProdutoCard
								key={produto.id}
								produto={produto}
								categoria={categorias.find((c) => c.id === produto.categoriaId)}
								lojas={lojas!}
								onEdit={openProdutoModal}
								onDelete={() => {}}
								onRemoveFromLoja={() => {}}
							/>
						))}
					</div>
				)}

				<CommonFooter roundedTop />
			</div>

			{/* Modals */}
			<ProdutoModal
				isOpen={produtoModalOpen}
				onClose={() => {
					setProdutoModalOpen(false);
					setEditingProduto(null);
				}}
				onSubmit={(data) => {
					console.log("submit produto:", data);
					// aqui você chama sua API:
					// if (editingProduto) updateProduto(...)
					// else createProduto(...)
					setProdutoModalOpen(false);
				}}
				produto={editingProduto ?? undefined}
				categorias={categorias}
				lojas={lojas ?? []}
				isLoading={false} // ou seu loading real
			/>
			<CategoriaModal
				isOpen={categoriaModalOpen}
				onClose={() => {
					setCategoriaModalOpen(false);
					setEditingCategoria(null);
				}}
				categoria={editingCategoria ?? undefined}
				onSubmit={handleCategoriaSubmit}
				isLoading={creatingCategoria || updatingCategoria}
			/>
		</div>
	);
}
