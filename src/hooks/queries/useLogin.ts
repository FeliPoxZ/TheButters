import { LoginInput } from "@/schemas/userSchema";
import AuthClient from "@/services/AuthClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ms from "ms";

export function useLoginMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (params: { data: LoginInput; secure?: boolean }) => {
			const auth = new AuthClient();
			return auth.login(params.data, params.secure ?? false); // retorna { token, user }
		},

		onSuccess: (res) => {
			// --- 1. Salva o token ---
			document.cookie = [
				`token=${res.token}`,
				"path=/",
				`max-age=${ms("1d")}`,
				window.location.protocol === "https:" ? "secure" : "",
			].join("; ");

			// --- 2. Salva o usuário autenticado no cache ---
			queryClient.setQueryData(["me"], res.user);
		},
	});
}
