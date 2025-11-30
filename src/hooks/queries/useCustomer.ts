import { LoginInput, RegisterInput } from "@/schemas/userSchema";
import AuthClient from "@/services/AuthClient";
import { useCustomerStore } from "@/app/loja/stores/customerStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ms from "ms";

export function useCustomerMutation() {
	const setCustomer = useCustomerStore((s) => s.setCustomer);
	const setToken = useCustomerStore((s) => s.setToken);

	return useMutation({
		mutationFn: async (params: { data: LoginInput }) => {
			const auth = new AuthClient();
			return auth.login(params.data); // retorna { token, user }
		},

		onSuccess: (res) => {
			setCustomer(res.user);
			setToken(res.token);

			document.cookie = [
				`customer=logged`,
				"path=/",
				`max-age=${ms("1d")}`,
				window.location.protocol === "https:" ? "secure" : "",
			].join("; ");
		},
	});
}

export function useCustomerRegisterMutation() {
	return useMutation({
		mutationFn: async (params: { data: RegisterInput }) => {
			const auth = new AuthClient();
			return auth.register(params.data);
		},

		onError: (err: any) => {			
			toast.error(err?.response?.data?.message || "Erro inesperado", { autoClose: ms("4s") });
		},
	});
}
