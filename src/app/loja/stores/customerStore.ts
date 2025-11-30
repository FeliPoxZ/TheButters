import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CustomerState {
	customer: UserSummary | null;
	token: string | null;
	setCustomer: (u: UserSummary | null) => void;
	setToken: (t: string | null) => void;
	logout: () => void;
}

export const useCustomerStore = create<CustomerState>()(
	persist(
		(set) => ({
			customer: null,
			token: null,
			setCustomer: (u) => set({ customer: u }),
			setToken: (t) => set({ token: t }),
			logout: () => set({ customer: null, token: null }),
		}),
		{
			name: "cliente-cardapio",
		}
	)
);
