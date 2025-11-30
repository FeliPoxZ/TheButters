import { CELULAR_BR_REGEX, CPF_REGEX } from "@/lib/regex";
import { z } from "zod";

/* -------------------------------------------
   LOGIN
------------------------------------------- */

export const loginSchema = z.object({
	email: z.string().min(3).max(100).email(),
	senha: z.string().min(5).max(255),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const loginResponseSchema = z.object({
	token: z.string(),
	user: z.object({
		id: z.string().uuid(),
		nome: z.string(),
		email: z.string().email(),
		tipo: z.string(),
	}),
});
export type LoginResponse = z.infer<typeof loginResponseSchema>;

/* -------------------------------------------
   REGISTER
------------------------------------------- */

export const registerSchema = z.object({
	nome: z.string().min(1, "Nome obrigatório"),
	sobrenome: z.string().min(1, "Sobrenome obrigatório"),
	email: z.string().email("Email inválido"),
	senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
	idade: z.number().min(1, "Idade inválida"),
	cpf: z.string().regex(CPF_REGEX, "CPF deve estar no formato 000.000.000-00"),
	numerocell: z.string().regex(CELULAR_BR_REGEX, "Celular inválido. Use o formato +5511999999999"),
	iszap: z.boolean(),
	lojaid: z.string().uuid().nullable(),
});
export type RegisterInput = z.infer<typeof registerSchema>;

/* -------------------------------------------
   CREATE USER (admin)
------------------------------------------- */

export const userCreateSchema = z.object({
	email: z.string().min(3).max(100).email(),
	senha: z.string().min(5).max(255),
	nome: z.string().min(5).max(200),
	sobrenome: z.string().min(5).max(200),
	idade: z.number().int().nonnegative(),
	cpf: z.string().regex(CPF_REGEX, "CPF inválido"),
	tipo: z.string().length(2),
	numerocell: z.string().regex(CELULAR_BR_REGEX, "Celular inválido. Use o formato +5511999999999"),
	iszap: z.boolean(),
	lojaid: z.string().uuid().nullable().optional(),
});
export type CreateUserInput = z.infer<typeof userCreateSchema>;

/* -------------------------------------------
   USER RESPONSE
------------------------------------------- */

export const userResponseSchema = z.object({
	id: z.string().uuid(),
	nome: z.string(),
	sobrenome: z.string(),
	email: z.string().email(),
	tipo: z.string(),
	numerocell: z.string(),
	iszap: z.boolean(),
	cpf: z.string(),
	status: z.string(),
	idade: z.number(),
	loja: z
		.object({
			id: z.string().uuid(),
			cnpj: z.string(),
			nome: z.string(),
			endereco: z
				.object({
					id: z.string().uuid(),
					rua: z.string(),
					numero: z.string(),
					cidade: z.string(),
				})
				.optional()
				.nullable(),
		})
		.optional()
		.nullable(),
});
export type UserResponse = z.infer<typeof userResponseSchema>;

/* -------------------------------------------
   UPDATE USER
------------------------------------------- */

export const userUpdateSchema = z.object({
	email: z.string().min(3).max(100).email().optional(),
	senha: z.string().min(5).max(255).optional(),
	nome: z.string().min(5).max(200).optional(),
	sobrenome: z.string().min(5).max(200).optional(),
	idade: z.number().int().optional(),
	cpf: z.string().regex(CPF_REGEX, "CPF inválido").optional(),
	tipo: z.string().length(2).optional(),
	status: z.string().length(2).optional(),
	numerocell: z
		.string()
		.regex(CELULAR_BR_REGEX, "Celular inválido. Use o formato +5511999999999")
		.optional(),
	iszap: z.boolean().optional(),
	lojaid: z.string().uuid().optional(),
});
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
