import { z } from "zod";

export const produtoSchema = z.object({
	id: z.string().uuid(),
	nome: z.string().min(3).max(100),
	descricao: z.string().min(10).max(600),
	preco: z.number().gt(0),
	imagemc: z.string().min(3).max(200),
	categoria: z.object({
		id: z.string().uuid(),
		nome: z.string(),
		descricao: z.string(),
	}),
});

export type ProdutoSchema = z.infer<typeof produtoSchema>;

export const produtoCreateSchema = z.object({
	nome: z.string().min(3).max(100),
	descricao: z.string().min(10).max(600),
	preco: z.number().gt(0),
	imagemc: z.string().min(3).max(200),
	categoriaid: z.string().uuid(),
});

export type ProdutoCreateSchema = z.infer<typeof produtoCreateSchema>;

export const produtoUpdateSchema = z.object({
	nome: z.string().min(3).max(100).optional(),
	descricao: z.string().min(10).max(600).optional(),
	preco: z.number().gt(0).optional(),
	imagemc: z.string().min(3).max(200).optional(),
	categoriaid: z.string().uuid().optional(),
});

export type ProdutoUpdateSchema = z.infer<typeof produtoUpdateSchema>;