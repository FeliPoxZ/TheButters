import { z } from "zod";

export const lojaCreateSchema = z.object({
	cnpj: z.string().min(14, "CNPJ inválido").max(18),
	nome: z.string().min(3, "Nome muito curto").max(100),
	enderecoid: z.string().uuid("Endereço inválido"),
});
export type LojaCreateInput = z.infer<typeof lojaCreateSchema>;

export const lojaUpdateSchema = z.object({
	cnpj: z.string().min(14).max(18).optional(),
	nome: z.string().min(3).max(100).optional(),
	enderecoid: z.string().uuid().optional(),
});
export type LojaUpdateInput = z.infer<typeof lojaUpdateSchema>;

export const enderecoResponseSchema = z.object({
	id: z.string().uuid(),
	rua: z.string(),
	numero: z.string(),
	cidade: z.string(),
});

export const lojaResponseSchema = z.object({
	id: z.string().uuid(),
	cnpj: z.string(),
	nome: z.string(),
	endereco: enderecoResponseSchema.optional().nullable(),
});
export type LojaResponse = z.infer<typeof lojaResponseSchema>;
