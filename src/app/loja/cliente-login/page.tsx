"use client";

import CommonFooter from "@/components/common/CommonFooter";
import CommonHeader from "@/components/common/CommonHeader";
import FormInput from "@/components/common/FormInput";
import { useCustomerMutation } from "@/hooks/queries/useCustomer";
import { zodResolver } from "@hookform/resolvers/zod";
import ms from "ms";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { LoginInput, loginSchema } from "@/schemas/userSchema";
import Link from "next/link";

export default function CustomerLogin() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", senha: "" },
	});

	const router = useRouter();

	const searchParams = useSearchParams();
	const redirectTo = searchParams.get("redirect") ?? "/loja/cliente";

	const loginMutation = useCustomerMutation();

	async function onSubmit(values: LoginInput) {
		loginMutation.mutate(
			{ data: values },
			{
				onSuccess: () => {
					router.push(redirectTo);
				},
				onError: (err: any) => {
					toast.error(err?.message || "Erro inesperado", { autoClose: ms("4s") });
				},
			}
		);
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
							Acesse sua conta ou registre-se para efetuar e acompanhar seus pedidos
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
									className="w-full rounded-xl py-3 font-semibold shadow-sm transition-all duration-300 cursor-pointer active:scale-[0.995] bg-secondary/75 hover:bg-secondary/90 disabled:bg-secondary/40 disabled:cursor-default"
								>
									{loginMutation.isPending ? "Entrando..." : "Entrar"}
								</button>
							</div>
							<p className="text-sm mt-3 text-center">
								Não tem conta?{" "}
								<Link href={`/loja/cliente-registro?redirect=${redirectTo}`} className="text-primary font-semibold">
									Cadastre-se
								</Link>
							</p>
						</form>
					</div>

					{/* Footer pequeno */}
					<CommonFooter />
				</div>
			</div>
		</div>
	);
}
