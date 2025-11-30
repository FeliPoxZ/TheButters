import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isDev } from "./lib/utils";
import { isDevDB } from "./lib/mode";

export function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl;

	const isProtectedRoute = pathname.startsWith("/gestao") && !pathname.startsWith("/gestao/auth");

	// Permitir assets internos
	if (
		pathname.startsWith("/_next") ||
		pathname === "/favicon.ico" ||
		pathname.match(/\.(png|jpg|jpeg|webp|gif|svg)$/)
	) {
		return NextResponse.next();
	}

	if (pathname.includes("/finalizar-pedido")) {
		// Liberar sub-rotas válidas
		if (
			pathname.includes("/consumo") ||
			pathname.includes("/login") ||
			pathname.includes("/pagamento")
		) {
			return NextResponse.next();
		}

		// Capturar slug dinamicamente
		const match = pathname.match(/^\/([^\/]+)\/pedido\/finalizar-pedido/);
		const slug = match?.[1];

		if (!slug) {
			return NextResponse.next();
		}

		// Redirecionar para a primeira etapa
		return NextResponse.redirect(new URL(`/${slug}/pedido/finalizar-pedido/consumo`, req.url));
	}

	//
	// 🔧 AMBIENTE DE DESENVOLVIMENTO
	//
	if (isDev) {
		// Se estiver na home "/" → redirecionar para /dev/cardapio
		if (pathname === "/") {
			return NextResponse.redirect(new URL("/dev/cardapio", req.url));
		}

		// Permite rotas dev
		if (pathname.startsWith("/dev")) {
			return NextResponse.next();
		}

		// Simulação em dev do /gestao/*
		if (isDevDB && isProtectedRoute) {
			const token = req.cookies.get("token")?.value;

			// Se não tem token → login
			if (!token) {
				return NextResponse.redirect(new URL("/gestao/auth", req.url));
			}
		}

		// Qualquer outra rota é permitida em dev
		return NextResponse.next();
	}

	//
	// 🚀 AMBIENTE DE PRODUÇÃO
	//

	// Bloqueia /dev/* em produção
	if (pathname.startsWith("/dev")) {
		return new NextResponse("Rota indisponível em produção", { status: 404 });
	}

	// 🔒 PROTEGE /gestao/*
	if (isProtectedRoute) {
		const token = req.cookies.get("token")?.value;

		// Se não tiver token → redireciona para login
		if (!token) {
			return NextResponse.redirect(new URL("/gestao/auth", req.url));
		}
	}

	// Rotas liberadas
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
