import ms from "ms";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
	user: UserSummary | null;
	timestamp: number;
	setUser: (u: UserSummary | null) => void;
	logout: () => void;
}

const TLL = ms("1d");

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			timestamp: Date.now(),
			setUser: (u) => set({ user: u, timestamp: Date.now() }),
			logout: () => set({ user: null }),
		}),
		{
			name: "auth",
			onRehydrateStorage: () => (state, error) => {
				if (!error) {
					const now = Date.now();
					if (now > (state?.timestamp ?? 0) + TLL) {
						state?.logout();
					}
				}
			},
		}
	)
);
