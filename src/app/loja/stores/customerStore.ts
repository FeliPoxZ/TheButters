import ms from "ms";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CustomerState {
	customer: UserSummary | null;
	token: string | null;
	timestamp: number;
	setCustomer: (u: UserSummary | null) => void;
	setToken: (t: string | null) => void;
	logout: () => void;
}

const TLL = ms("1d");

export const useCustomerStore = create<CustomerState>()(
	persist(
		(set) => ({
			customer: null,
			token: null,
			timestamp: Date.now(),
			setCustomer: (u) => set({ customer: u, timestamp: Date.now() }),
			setToken: (t) => set({ token: t, timestamp: Date.now() }),
			logout: () => set({ customer: null, token: null }),
		}),
		{
			name: "cliente-cardapio",
			onRehydrateStorage: () => (state, error) => {
				if (!error) {
					const now = Date.now();
					if (now > (state?.timestamp ?? 0) + TLL) {
						state?.logout();
						document.cookie = [
							`customer=`,
							"path=/",
							`max-age=0`,
							window.location.protocol === "https:" ? "secure" : "",
						].join("; ");
					}
				}
			},
		}
	)
);
