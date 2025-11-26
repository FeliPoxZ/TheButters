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
	email: z.string().min(3).max(100).email(),
	senha: z.string().min(5).max(255),
	nome: z.string().min(5).max(200),
	sobrenome: z.string().min(5).max(200),
	idade: z.number().int().nonnegative(),
	cpf: z.string().min(11).max(14),
	numerocell: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Número inválido (E.164)"),
	iszap: z.boolean(),
	lojaid: z.string().uuid().nullable().optional(),
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
	cpf: z.string().min(11).max(14),
	tipo: z.string().length(2),
	numerocell: z.string().regex(/^\+?[1-9]\d{1,14}$/),
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
	cpf: z.string().min(11).max(14).optional(),
	tipo: z.string().length(2).optional(),
	status: z.string().length(2).optional(),
	numerocell: z
		.string()
		.regex(/^\+?[1-9]\d{1,14}$/)
		.optional(),
	iszap: z.boolean().optional(),
	lojaid: z.string().uuid().optional(),
});
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
