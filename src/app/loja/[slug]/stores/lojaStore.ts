"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LojaStore {
	lojaId: string | null;
	setLojaId: (id: string) => void;
}

export const useLojaStore = create(
	persist<LojaStore>(
		(set) => ({
			lojaId: null,
			setLojaId: (id: string) => set({ lojaId: id }),
		}),
		{
			name: "lojaId",
		}
	)
);
