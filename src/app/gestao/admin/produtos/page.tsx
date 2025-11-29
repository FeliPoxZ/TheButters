"use client";

import { useState, useMemo } from "react";
import { Plus, Package, Tag, Filter } from "lucide-react";
import CommonHeader from "@/components/common/CommonHeader";
import ProdutoCard from "@/components/ui/gestao/admin/produtos/ProdutoCard";
/* import ProdutoModal from "@/components/produtos/ProdutoModal";
import CategoriaModal from "@/components/produtos/CategoriaModal"; */
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import CommonFooter from "@/components/common/CommonFooter";
import ExtraHeader from "@/components/ui/gestao/ExtraHeader";

const MOCK_CATEGORIAS = [
	{ id: "1", nome: "Bebidas", descricao: "Refrigerantes, sucos e águas" },
	{ id: "2", nome: "Snacks", descricao: "Salgadinhos e petiscos" },
	{ id: "3", nome: "Doces", descricao: "Chocolates e balas" },
	{ id: "4", nome: "Higiene", descricao: "Produtos de limpeza e higiene pessoal" },
];

const MOCK_LOJAS = [
	{ id: "1", nome: "Loja Centro" },
	{ id: "2", nome: "Loja Shopping" },
	{ id: "3", nome: "Loja Zona Sul" },
	{ id: "4", nome: "Loja Norte" },
];

const MOCK_PRODUTOS = [
	{
		id: "1",
		nome: "Coca-Cola 2L",
		descricao: "Refrigerante Coca-Cola garrafa 2 litros",
		preco: 8.99,
		categoriaId: "1",
		lojaIds: ["1", "2", "3"],
	},
	{
		id: "2",
		nome: "Doritos Queijo",
		descricao: "Salgadinho Doritos sabor queijo 150g",
		preco: 6.5,
		categoriaId: "2",
		lojaIds: ["1", "2"],
	},
	{
		id: "3",
		nome: "Chocolate Lacta",
		descricao: "Chocolate ao leite Lacta 90g",
		preco: 4.99,
		categoriaId: "3",
		lojaIds: ["2", "3", "4"],
	},
	{
		id: "4",
		nome: "Sabonete Dove",
		descricao: "Sabonete em barra Dove 90g",
		preco: 3.5,
		categoriaId: "4",
		lojaIds: ["1", "3", "4"],
	},
	{
		id: "5",
		nome: "Pepsi 2L",
		descricao: "Refrigerante Pepsi garrafa 2 litros",
		preco: 7.99,
		categoriaId: "1",
		lojaIds: ["1", "2", "3", "4"],
	},
	{
		id: "6",
		nome: "Ruffles Original",
		descricao: "Batata frita Ruffles original 100g",
		preco: 5.99,
		categoriaId: "2",
		lojaIds: ["2", "4"],
	},
];

export default function ProdutosPage() {
	const [produtoModalOpen, setProdutoModalOpen] = useState(false);
	const [categoriaModalOpen, setCategoriaModalOpen] = useState(false);
	const [editingProduto, setEditingProduto] = useState<any>(null);
	const [editingCategoria, setEditingCategoria] = useState<any>(null);
	const [filterLojaId, setFilterLojaId] = useState<string>("all");
	const [filterCategoriaId, setFilterCategoriaId] = useState<string>("all");

	const produtos = MOCK_PRODUTOS;
	const categorias = MOCK_CATEGORIAS;
	const lojas = MOCK_LOJAS;

	// Filtered products
	const filteredProdutos = useMemo(() => {
		return produtos.filter((produto) => {
			const lojaMatch = filterLojaId === "all" || produto.lojaIds.includes(filterLojaId);
			const categoriaMatch =
				filterCategoriaId === "all" || produto.categoriaId === filterCategoriaId;
			return lojaMatch && categoriaMatch;
		});
	}, [produtos, filterLojaId, filterCategoriaId]);

	const openProdutoModal = (produto?: any) => {
		setEditingProduto(produto || null);
		setProdutoModalOpen(true);
	};

	const openCategoriaModal = (categoria?: any) => {
		setEditingCategoria(categoria || null);
		setCategoriaModalOpen(true);
	};

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-7xl mx-auto px-4 py-6">
				{/* Header Card */}
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
									onClick={() => openProdutoModal()}
									className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold bg-secondary/75 hover:bg-secondary/90 transition-all duration-300 shadow-sm active:scale-[0.98]"
								>
									<Plus className="w-4 h-4" />
									<span>Novo Produto</span>
								</button>
							</div>
						</div>

						{/* Filters */}
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
									{lojas.map((loja) => (
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

				{/* Products Grid */}
				{filteredProdutos.length === 0 ? (
					<div className="bg-item rounded-2xl shadow-md p-12 text-center">
						<Package className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
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
								lojas={lojas}
								onEdit={openProdutoModal}
								onDelete={() => {}}
								onRemoveFromLoja={() => {}}
							/>
						))}
					</div>
				)}

				{/* Footer */}
				<CommonFooter roundedTop />
			</div>

			{/* Modals */}
			{/* <ProdutoModal
				isOpen={produtoModalOpen}
				onClose={() => {
					setProdutoModalOpen(false);
					setEditingProduto(null);
				}}
				onSubmit={() => {}}
				produto={editingProduto}
				categorias={categorias}
				lojas={lojas}
				isLoading={false}
			/>

			<CategoriaModal
				isOpen={categoriaModalOpen}
				onClose={() => {
					setCategoriaModalOpen(false);
					setEditingCategoria(null);
				}}
				onSubmit={() => {}}
				categoria={editingCategoria}
				isLoading={false}
			/> */}
		</div>
	);
}
