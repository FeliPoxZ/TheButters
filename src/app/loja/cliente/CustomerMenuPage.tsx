"use client";

import CommonFooter from "@/components/common/CommonFooter";
import CommonHeader from "@/components/common/CommonHeader";
import FormInput from "@/components/common/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateSchema, UserUpdateInput } from "@/schemas/userSchema";
import { useCustomerStore } from "@/app/loja/stores/customerStore";
import { useMutation } from "@tanstack/react-query";
import ms from "ms";
import { toast } from "react-toastify";
import Link from "next/link";
import ColumnView from "@/components/layout/ColumnView";
import { useSearchParams } from "next/navigation";
import RowView from "@/components/layout/RowView";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

export default function CustomerMenuPage() {
    const customer = useCustomerStore((s) => s.customer);
    const logout = useCustomerStore((s) => s.logout);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserUpdateInput>({
        resolver: zodResolver(userUpdateSchema),
        defaultValues: {
            nome: customer?.nome || "",
            email: customer?.email || "",
        },
    });

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") ?? "/loja/cliente-login";

    // API de update — plugue sua real aqui
    const updateMutation = useMutation({
        mutationFn: async (data: UserUpdateInput) => {
            // TODO: chamar seu endpoint real
            console.log("Enviando update -> ", data);

            await new Promise((r) => setTimeout(r, 800));
            return { message: "Atualizado com sucesso" };
        },
        onSuccess: () => {
            toast.success("Dados atualizados!", { autoClose: ms("3s") });
        },
        onError: (err: any) => {
            toast.error(err?.message || "Erro ao atualizar", { autoClose: ms("4s") });
        },
    });

    function onSubmit(values: UserUpdateInput) {
        updateMutation.mutate(values);
    }

    const handleLogout = () => {
        document.cookie = [
            `customer=`,
            "path=/",
            `max-age=0`,
            window.location.protocol === "https:" ? "secure" : "",
        ].join("; ");
        logout();
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-lg">
                {/* Card */}
                <div className="grid grid-rows-[auto_auto_1fr] md:rounded-2xl shadow-xl overflow-hidden bg-item h-screen md:h-auto">
                    {/* Header */}
                    <CommonHeader
                        extra={
                            <RowView className="gap-4">
                                <Link href={redirectTo} onClick={handleLogout}>
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
                                <Link href={redirectTo}>
                                    <ColumnView align="center">
                                        <ArrowUturnLeftIcon className="size-8 text-foreground/80"/>
                                        <p className="text-sm text-foreground/80 text-center">Voltar</p>
                                    </ColumnView>
                                </Link>
                            </RowView>
                        }
                    />

                    {/* Body */}
                    <div className="p-6 space-y-4">
                        <h2 className="text-2xl font-bold text-foreground/90">Meu Perfil</h2>

                        <p className="text-sm mb-4" style={{ color: "rgba(23,23,23,0.7)" }}>
                            Atualize seus dados pessoais e informações de contato.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Nome */}
                            <FormInput
                                label="Nome"
                                name="nome"
                                placeholder="Seu nome"
                                register={register}
                                error={errors.nome}
                            />

                            {/* Email */}
                            <FormInput
                                label="Email"
                                name="email"
                                placeholder="seu@exemplo.com"
                                register={register}
                                error={errors.email}
                                type="email"
                            />

                            {/* Senha */}
                            <FormInput
                                label="Senha"
                                name="senha"
                                type="password"
                                placeholder="Nova senha (opcional)"
                                register={register}
                                error={errors.senha}
                            />

                            {/* Botão de salvar */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={updateMutation.isPending}
                                    className="w-full rounded-xl py-3 font-semibold shadow-sm transition-all duration-300 cursor-pointer active:scale-[0.995] bg-secondary/75 hover:bg-secondary/90 disabled:bg-secondary/40 disabled:cursor-default"
                                >
                                    {updateMutation.isPending ? "Salvando..." : "Salvar alterações"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <CommonFooter />
                </div>
            </div>
        </div>
    );
}
