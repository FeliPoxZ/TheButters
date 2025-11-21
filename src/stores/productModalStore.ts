import { create } from "zustand";

interface ProductModalStore {
	item?: Product;
	isOpen: boolean;
	toggleProductModal: (item?: Product) => void;
}

export const useProductModalStore = create<ProductModalStore>((set) => ({
	item: undefined,
	isOpen: false,
	toggleProductModal(item) {
		set(() => ({
			item,
			isOpen: item !== undefined
		}))
	},
}));
