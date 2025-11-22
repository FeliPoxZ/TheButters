import ms from "ms";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BagStore {
	items: ItemBag[];
	addToBag: (item: Product) => void;
	removeFromBag: (index: number) => void;
	increaseItemCount: (index: number) => void;
	decreaseItemCount: (index: number) => void;
	clearBag: () => void;
	useBagTotal: () => number;
	useItemQuantity: (index: number) => number;
}

/* const TTL = ms('10s') */

const useBagStore = create(
	persist<BagStore>(
		(set, get) => ({
			items: [],

			addToBag(product) {
				set((store) => {
					const index = store.items.findIndex((i) => i.item.id === product.id);

					if (index !== -1) {
						const current = store.items[index];
						if (!current || current.qtd >= 99) return store;
						return {
							items: store.items.map((it, i) =>
								i === index ? ({ ...it, qtd: it.qtd + 1 } as ItemBag) : it
							),
						};
					}

					return {
						items: [...store.items, { item: product, qtd: 1 } as ItemBag],
					};
				});
			},

			removeFromBag(index) {
				set((store) => ({
					items: store.items.filter((_, i) => i !== index),
				}));
			},

			increaseItemCount(index) {
				set((store) => {
					const current = store.items[index];
					if (!current || current.qtd >= 99) return store;

					return {
						items: store.items.map((it, i) => (i === index ? { ...it, qtd: it.qtd + 1 } : it)),
					};
				});
			},

			decreaseItemCount(index) {
				set((store) => {
					const current = store.items[index];
					if (!current || current.qtd <= 1) return store;

					return {
						items: store.items.map((it, i) => (i === index ? { ...it, qtd: it.qtd - 1 } : it)),
					};
				});
			},

			clearBag() {
				set({ items: [] });
			},

			useBagTotal() {
				const items = get().items;
				return items.reduce((sum, it) => sum + it.item.preco * it.qtd, 0);
			},

			useItemQuantity(index) {
				const items = get().items;
				const current = items[index];
				if (current) return current.qtd;
				return 0;
			},
		}),
		{
			name: "bag-store",
		}
	)
);

export default useBagStore;
