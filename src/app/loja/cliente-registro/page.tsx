"use client";

import CommonFooter from "@/components/common/CommonFooter";
import CommonHeader from "@/components/common/CommonHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/schemas/userSchema";
import { useCustomerRegisterMutation } from "@/hooks/queries/useCustomer";
import { maskCell, maskCPF } from "@/lib/masks";
import FormInput from "@/components/common/FormInput";
import RowView from "@/components/layout/RowView";
import { toast } from "react-toastify";
import ms from "ms";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CustomerRegister() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			senha: "",
			nome: "",
			sobrenome: "",
			idade: 0,
			cpf: "",
			numerocell: "+55",
			iszap: false,
			lojaid: null,
		},
	});

	const registerMutation = useCustomerRegisterMutation();

	const router = useRouter();

	const searchParams = useSearchParams();
	const redirectTo = searchParams.get("redirect") ?? "/loja/cliente-login";

	function onSubmit(values: RegisterInput) {
		const clean = {
			...values,
			numerocell: "+55" + values.numerocell.replace(/\D/g, "").slice(-11),
		};

		registerMutation.mutate(
			{ data: clean },
			{
				onSuccess: () => {
					toast.success("Conta criada com sucesso!", {
						autoClose: ms("4s"),
						onClose: () => {
							router.push(`/loja/cliente-login?redirect=${redirectTo}`);
						},
					});
				},
			}
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="w-full max-w-md">
				<div className="grid grid-rows-[auto_auto_1fr] md:rounded-2xl shadow-xl overflow-hidden bg-item h-screen md:h-auto">
					<CommonHeader />

					<div className="p-6 pb-2">
						<h2 className="text-2xl font-bold mb-1 text-foreground/90">Criar Conta</h2>
						<p className="text-sm mb-4" style={{ color: "rgba(23,23,23,0.7)" }}>
							Preencha seus dados para criar uma nova conta
						</p>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
							<RowView className="gap-4">
								{/* Nome */}
								<FormInput label="Nome" name="nome" register={register} error={errors.nome} />

								{/* Sobrenome */}
								<FormInput
									label="Sobrenome"
									name="sobrenome"
									register={register}
									error={errors.sobrenome}
								/>
							</RowView>

							<RowView className="gap-4">
								{/* CPF — com máscara */}
								<div className="w-full">
									<FormInput
										label="CPF"
										name="cpf"
										register={register}
										error={errors.cpf}
										onChange={(e) => {
											e.target.value = maskCPF(e.target.value);
										}}
									/>
								</div>

								{/* Idade */}
								<div className="w-1/4">
									<FormInput
										label="Idade"
										name="idade"
										type="number"
										register={register}
										error={errors.idade}
										registerOptions={{ valueAsNumber: true }}
									/>
								</div>
							</RowView>

							{/* Senha */}
							<FormInput
								label="Senha"
								name="senha"
								type="password"
								register={register}
								error={errors.senha}
							/>

							<RowView className="gap-4">
								<div>
									{/* Número de celular */}
									<FormInput
										label="Celular"
										name="numerocell"
										placeholder="+5516999998888"
										register={register}
										error={errors.numerocell}
										onChange={(e) => {
											e.target.value = maskCell(e.target.value);
										}}
									/>

									{/* WhatsApp */}
									<div className="flex items-center gap-2 pl-2 pt-2">
										<input type="checkbox" {...register("iszap")} />
										<label className="text-sm">É WhatsApp</label>
									</div>
								</div>
								{/* Email */}
								<FormInput
									label="Email"
									name="email"
									type="email"
									register={register}
									error={errors.email}
								/>
							</RowView>

							{/* Botão */}
							<div className="pt-2">
								<button
									type="submit"
									disabled={registerMutation.isPending}
									className="w-full rounded-xl py-3 font-semibold shadow-sm bg-secondary/75 hover:bg-secondary/90 disabled:bg-secondary/40 active:scale-[0.995] transition-all"
								>
									{registerMutation.isPending ? "Criando..." : "Criar Conta"}
								</button>
							</div>
							<p className="text-sm mt-3 text-center">
								Já possui conta?{" "}
								<Link href={`/loja/cliente-login?redirect=${redirectTo}`} className="text-primary font-semibold">
									Entre
								</Link>
							</p>
						</form>
					</div>

					<CommonFooter />
				</div>
			</div>
		</div>
	);
}
