import { z } from "zod";

export const categoriaSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(3).max(100),
  descricao: z.string().min(5).max(600),
});

export type CategoriaSchema = z.infer<typeof categoriaSchema>;

export const categoriaCreateSchema = z.object({
  nome: z.string().min(3).max(100),
  descricao: z.string().min(5).max(600),
});

export type CategoriaCreateSchema = z.infer<typeof categoriaCreateSchema>;

export const categoriaUpdateSchema = z.object({
  nome: z.string().min(3).max(100),
  descricao: z.string().min(5).max(600),
});

export type CategoriaUpdateSchema = z.infer<typeof categoriaUpdateSchema>;