import { create } from "zustand";

interface ItemModalStore {
	item?: Product;
	isOpen: boolean;
	toggleItemModal: (item?: Product) => void;
}

export const useItemModalStore = create<ItemModalStore>((set) => ({
	item: undefined,
	isOpen: false,
	toggleItemModal(item) {
		set(() => ({
			item,
			isOpen: item !== undefined
		}))
	},
}));
