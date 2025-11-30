import { create } from "zustand";
import { persist } from "zustand/middleware";

type Consumo = "M" | "R" | "E" | "T";

interface CheckoutStore {
	consumo: Consumo | null;
	setConsumo: (c: Consumo) => void;
}

export const useCheckoutStore = create(
	persist<CheckoutStore>(
		(set) => ({
			consumo: null,
			setConsumo: (c) => set({ consumo: c }),
		}),
		{
      name: "consumo-storage"
    }
	)
);
