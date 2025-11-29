import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
	user: UserSummary | null;
	setUser: (u: UserSummary | null) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			setUser: (u) => set({ user: u }),
			logout: () => set({ user: null }),
		}),
		{
			name: "auth",
		}
	)
);
