"use client";

import Link from "next/link";
import CommonHeader from "@/components/common/CommonHeader";
import RowView from "@/components/layout/RowView";
import ColumnView from "@/components/layout/ColumnView";
import { useQueryClient } from "@tanstack/react-query";
import { useMe } from "@/hooks/queries/useMe";
import CardLink from "@/components/ui/gestao/CardLink";
import { isDevLocalClient } from "@/lib/mode";

export default function GestaoHub() {
	const queryClient = useQueryClient();

	const handleLogout = () => {
		document.cookie = [
			"token=",
			"path=/",
			window.location.protocol === "https:" ? "secure" : "",
			"max-age=0",
		].join("; ");

		queryClient.removeQueries({ queryKey: ["me"] });
	};

	const { data: user } = useMe();

	const allowAdmin =
		isDevLocalClient ||
		(user !== null && user !== undefined && (user.tipo === "DV" || user.tipo === "AD"));

	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="w-full max-w-5xl md:px-4 md:py-10">
				{/* Card principal */}
				<div className="bg-item shadow-xl md:rounded-2xl overflow-hidden border border-banner/40">
					{/* Header */}
					<CommonHeader
						extra={
							<RowView align="center" className="text-foreground gap-6">
								<Link href={"/gestao/account"}>
									<ColumnView align="center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="size-8 text-foreground/80"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
											/>
										</svg>

										<p className="text-sm text-foreground/80 text-center">
											{user ? user?.nome : "User"}
										</p>
									</ColumnView>
								</Link>

								<Link href={"/gestao/auth"} onClick={handleLogout}>
									<ColumnView align="center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="size-8 text-foreground/80"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
											/>
										</svg>
										<p className="text-sm text-foreground/80 text-center">Sair</p>
									</ColumnView>
								</Link>
							</RowView>
						}
					/>
					{/* Conteúdo principal */}
					<div className="px-8 py-10">
						<h2 className="text-2xl md:text-3xl font-bold text-foreground/90 mb-3">Gestão</h2>
						<p className="text-sm md:text-base mb-8 text-foreground/70">
							Selecione abaixo uma das áreas de gerenciamento:
						</p>

						{/* GRID RESPONSIVO */}
						<div
							className="
							grid 
							grid-cols-1 
							md:flex 
							md:justify-center
							gap-6
						"
						>
							{/* BOTÃO ADMIN */}
							{allowAdmin ? (
								<CardLink
									href="/gestao/admin"
									title="Administração"
									description="Gerencie usuários, permissões e configurações gerais."
									svg={
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="size-10 mb-2 text-foreground/80"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
											/>
										</svg>
									}
								/>
							) : null}

							{/* BOTÃO BALCÃO */}
							<CardLink
								href="/gestao/balcao"
								title="Balcão"
								description="Acesso rápido ao sistema de atendimento do balcão."
								svg={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-10 mb-2 text-foreground/80"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
										/>
									</svg>
								}
							/>

							{/* BOTÃO DE PEDIDOS */}
							<CardLink
								href="/gestao/pedidos"
								title="Pedidos"
								description="Visualize, acompanhe e gerencie pedidos em tempo real."
								svg={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-10 mb-2 text-foreground/80"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
										/>
									</svg>
								}
							/>
						</div>
					</div>

					{/* Rodapé */}
					<div className="px-6 py-3 text-xs text-center bg-banner text-foreground">
						Atendimento das 9h às 22h • Loja Aberta
					</div>
				</div>
			</div>
		</div>
	);
}
