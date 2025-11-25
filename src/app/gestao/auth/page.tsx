"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import RowView from "@/components/layout/RowView";
import Line from "@/components/common/Line";
import AuthClient from "@/services/AuthClient";
import { toast } from "react-toastify";
import ms from "ms";
import FormInput from "@/components/common/FormInput";
import { isDev } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { isDevLocalClient } from "@/lib/mode";

const bypass = isDev && isDevLocalClient

// Zod schema concordante com seu DTO LoginInput (Email e Senha)
const loginSchema = z.object({
	email: z.string().min(bypass ? 1 : 3, "Email muito curto").max(100).email("Email inválido"),
	senha: z.string().min(bypass ? 1 : 5, "Senha muito curta").max(255),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// Componente
export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", senha: "" },
	});

	const router = useRouter();

	async function onSubmit(values: LoginSchema) {
		if (bypass) {
			router.push("/gestao/home");
		}

		const auth = new AuthClient();

		try {
			const res = await auth.login(values);

			// Caso sucesso → LoginResponse
			document.cookie = [
				`token=${res.token}`,
				"path=/",
				`max-age=${ms("7d")}`, // 7 dias
				window.location.protocol === "https:" ? "secure" : "",
			].join("; ");

			router.push("/gestao/home");
		} catch (err: any) {
			toast.error(err?.message || "Erro inesperado", {
				autoClose: ms("4s"),
			});
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="w-full max-w-md">
				{/* Card */}
				<div className="grid grid-rows-[auto_auto_1fr] md:rounded-2xl shadow-xl overflow-hidden bg-item h-screen md:h-auto">
					{/* Banner com imagem */}
					<header className="w-full h-auto">
						<div className="bg-banner w-full h-[17.5vh] border-b-4 md:border-b-6 border-b-secondary relative">
							<div className="h-full aspect-auto">
								<Image
									src={"/Capivara.webp"}
									alt="banner"
									fill
									priority
									className="object-contain"
								/>
							</div>
						</div>
						<section className="w-full  px-6">
							<RowView justify="start" align="center" className="h-full py-3">
								<RowView align="center" className="gap-2">
									<div className="relative h-20 md:h-26 border-2 border-white aspect-square rounded-full bg-primary -mt-10 md:-mt-16">
										<Image src={"/Logo.webp"} alt="logo" fill priority className="object-contain" />
									</div>
									<h1 className="font-poppins font-semibold text-foreground/80 text-[1.4rem] md:text-3xl">
										The Butters
									</h1>
								</RowView>
							</RowView>
						</section>
					</header>
					<Line />
					{/* Body */}
					<div className="p-6">
						<h2 className="text-2xl font-bold mb-1 text-foreground/90">Entrar</h2>
						<p className="text-sm mb-4" style={{ color: "rgba(23,23,23,0.7)" }}>
							Acesse sua conta de administrador
						</p>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<FormInput
								label="Email"
								name="email"
								type="email"
								placeholder="seu@exemplo.com"
								register={register}
								error={errors.email}
							/>

							<FormInput
								label="Senha"
								name="senha"
								type="password"
								placeholder="••••••••"
								register={register}
								error={errors.senha}
								extra={
									<a className="text-xs font-medium text-primary" href="#forgot">
										Esqueceu?
									</a>
								}
							/>

							{/* Submit */}
							<div className="pt-2">
								<button
									type="submit"
									disabled={isSubmitting}
									className="w-full rounded-xl py-3 font-semibold shadow-sm transition-all duration-300 cursor-pointer active:scale-[0.995] bg-secondary/75 hover:bg-secondary/90 disabled:bg-secondary/40"
								>
									{isSubmitting ? "Entrando..." : "Entrar"}
								</button>
							</div>
						</form>
					</div>

					{/* Footer pequeno */}
					<div className="px-6 py-3 text-xs text-center bg-banner text-foreground">
						Atendimento das 9h às 22h • Loja Aberta
					</div>
				</div>
			</div>
		</div>
	);
}
