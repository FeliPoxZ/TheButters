"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import ms from "ms";
import FormInput from "@/components/common/FormInput";
import { isDev } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { isDevLocalClient } from "@/lib/mode";
import CommonHeader from "@/components/common/CommonHeader";
import { useLoginMutation } from "@/hooks/mutations/useLogin";

const bypass = isDev && isDevLocalClient;

const loginSchema = z.object({
	email: z
		.string()
		.min(bypass ? 1 : 3, "Email muito curto")
		.max(100)
		.email("Email inválido"),
	senha: z
		.string()
		.min(bypass ? 1 : 5, "Senha muito curta")
		.max(255),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", senha: "" },
	});

	const router = useRouter();

	const loginMutation = useLoginMutation();

	async function onSubmit(values: LoginSchema) {
		if (bypass) {
			router.push("/gestao");
		}

		loginMutation.mutate({data: values}, {
			onSuccess: () => {
				router.push("/gestao");
			},
			onError: (err: any) => {
				toast.error(err?.message || "Erro inesperado", { autoClose: ms("4s") });
			},
		});
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="w-full max-w-md">
				{/* Card */}
				<div className="grid grid-rows-[auto_auto_1fr] md:rounded-2xl shadow-xl overflow-hidden bg-item h-screen md:h-auto">
					{/* Header */}
					<CommonHeader />
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
										Esqueci a senha
									</a>
								}
							/>

							{/* Submit */}
							<div className="pt-2">
								<button
									type="submit"
									disabled={loginMutation.isPending}
									className="w-full rounded-xl py-3 font-semibold shadow-sm transition-all duration-300 cursor-pointer active:scale-[0.995] bg-secondary/75 hover:bg-secondary/90 disabled:bg-secondary/40"
								>
									{loginMutation.isPending ? "Entrando..." : "Entrar"}
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
