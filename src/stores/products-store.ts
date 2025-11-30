import { create } from "zustand";

export interface Categoria {
	id: string;
	nome: string;
}

export interface Loja {
	id: string;
	nome: string;
}

export interface Produto {
	id: string;
	nome: string;
	descricao?: string;
	preco: number;
	categoriaId: string;
	lojaIds: string[];
	createdAt: Date;
}

interface ProductsState {
	produtos: Produto[];
	categorias: Categoria[];
	lojas: Loja[];
	setProdutos: (produtos: Produto[]) => void;
	setCategorias: (categorias: Categoria[]) => void;
	setLojas: (lojas: Loja[]) => void;
	addProduto: (produto: Produto) => void;
	updateProduto: (id: string, produto: Partial<Produto>) => void;
	deleteProduto: (id: string) => void;
	addCategoria: (categoria: Categoria) => void;
	updateCategoria: (id: string, categoria: Partial<Categoria>) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
	produtos: [],
	categorias: [],
	lojas: [],
	setProdutos: (produtos) => set({ produtos }),
	setCategorias: (categorias) => set({ categorias }),
	setLojas: (lojas) => set({ lojas }),
	addProduto: (produto) => set((state) => ({ produtos: [...state.produtos, produto] })),
	updateProduto: (id, produto) =>
		set((state) => ({
			produtos: state.produtos.map((p) => (p.id === id ? { ...p, ...produto } : p)),
		})),
	deleteProduto: (id) =>
		set((state) => ({
			produtos: state.produtos.filter((p) => p.id !== id),
		})),
	addCategoria: (categoria) => set((state) => ({ categorias: [...state.categorias, categoria] })),
	updateCategoria: (id, categoria) =>
		set((state) => ({
			categorias: state.categorias.map((c) => (c.id === id ? { ...c, ...categoria } : c)),
		})),
}));
