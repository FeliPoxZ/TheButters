import { z } from "zod";

// =============================
// CREATE
// =============================
export const pedidoCreateSchema = z.object({
	precototal: z.number().min(0),
	precoentrega: z.number().min(0),
	tipopedido: z.enum(["R", "E", "T", "M"]),
	statuspedido: z.enum(["A", "B", "P", "E", "F", "S"]),
	observacao: z.string().max(500).optional().nullable(),
	mesa: z.number().int().min(0),

	lojaid: z.string().uuid(),
	usuarioid: z.string().uuid(),
	enderecoid: z.string().uuid().optional().nullable(),
});

export type PedidoCreateInput = z.infer<typeof pedidoCreateSchema>;

// =============================
// UPDATE (parcial)
// =============================
export const pedidoUpdateSchema = z.object({
	preco_entrega: z.number().min(0).optional(),
	tipo_pedido: z.enum(["R", "E", "T", "M"]).optional(),
	status_pedido: z.enum(["A", "B", "P", "E", "F", "S"]).optional(),
	observacao: z.string().max(500).optional(),
	mesa: z.number().int().min(0).optional(),
	loja_id: z.string().uuid().optional(),
	usuario_id: z.string().uuid().optional(),
});

export type PedidoUpdateInput = z.infer<typeof pedidoUpdateSchema>;

// =============================
// RESPONSE
// =============================
export const pedidoResponseSchema = z.object({
	id: z.string().uuid(),
	precototal: z.number(),
	precoentrega: z.number(),
	tipopedido: z.string(),
	statuspedido: z.string(),
	observacao: z.string(),
	datapedido: z.string().datetime(),
	mesa: z.number(),

	loja: z.any().nullable(),
	usuario: z.any().nullable(),
	enderecousuario: z.any().nullable(),
	items: z.array(z.any()),
});

export type PedidoResponse = z.infer<typeof pedidoResponseSchema>;
