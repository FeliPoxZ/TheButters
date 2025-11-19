import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// Rotas públicas de páginas
	const publicRoutes = ["/cardapio"];

	// Permitir assets internos
	if (
		pathname.startsWith("/_next") ||
		pathname === "/favicon.ico" ||
		pathname.match(/\.(png|jpg|jpeg|webp|gif|svg)$/)
	) {
		return NextResponse.next();
	}

	// Verificar páginas protegidas
	if (!publicRoutes.includes(pathname)) {
		const token = req.cookies.get("token")?.value;
		if (!token) {
			return NextResponse.redirect(new URL("/cardapio", req.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
