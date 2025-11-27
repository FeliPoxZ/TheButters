"use client";

import Link from "next/link";
import CommonHeader from "@/components/common/CommonHeader";
import RowView from "@/components/layout/RowView";
import ColumnView from "@/components/layout/ColumnView";
import { useQueryClient } from "@tanstack/react-query";
import { useMe } from "@/hooks/queries/useMe";
import CardLink from "@/components/ui/gestao/CardLink";
import { isDevLocalClient } from "@/lib/mode";

export default function AdminHub() {
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
						<h2 className="text-2xl md:text-3xl font-bold text-foreground/90 mb-3">
							Administração
						</h2>
						<p className="text-sm md:text-base mb-8 text-foreground/70">
							Selecione abaixo uma das áreas da administração:
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
							<CardLink
								href="/gestao/admin/usuarios"
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
											d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
										/>
									</svg>
								}
								title="Usuários"
								description="Gerencie contas, acessos e permissões dos colaboradores."
							/>

							<CardLink
								href="/gestao/admin/produtos"
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
											d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
										/>
										<path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
									</svg>
								}
								title="Produtos"
								description="Cadastre e atualize os produtos disponíveis em todas as filiais."
							/>
							<CardLink
								href="/gestao/admin/filiais"
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
											d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
										/>
									</svg>
								}
								title="Filiais"
								description="Administre as unidades da franquia e suas configurações."
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
