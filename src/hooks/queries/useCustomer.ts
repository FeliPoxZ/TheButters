
import { LoginInput } from "@/schemas/userSchema";
import AuthClient from "@/services/AuthClient";
import { useCustomerStore } from "@/app/loja/stores/customerStore";
import { useMutation } from "@tanstack/react-query";

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
		},
	});
}
