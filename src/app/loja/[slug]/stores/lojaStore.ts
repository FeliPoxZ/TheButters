"use client";

import { create } from "zustand";

interface LojaStore {
	lojaId: string | null;
	setLojaId: (id: string) => void;
}

export const useLojaStore = create<LojaStore>((set) => ({
	lojaId: null,
	setLojaId: (id: string) => set({ lojaId: id }),
}));
