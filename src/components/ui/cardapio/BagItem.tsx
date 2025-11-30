import ColumnView from "@/components/layout/ColumnView";
import RowView from "@/components/layout/RowView";
import useBagStore from "@/app/loja/[slug]/stores/useBagStore";
import { toPrice } from "@/lib/utils";

interface Props {
	item: Product;
	itemIndex: number;
}

function BagItem({ item, itemIndex }: Props) {
	const useItemQuantity = useBagStore((s) => s.useItemQuantity);
	const increase = useBagStore((s) => s.increaseItemCount);
	const decrease = useBagStore((s) => s.decreaseItemCount);
	const remove = useBagStore((s) => s.removeFromBag)

	const qtd = useItemQuantity(itemIndex);

	return (
		<ColumnView className="w-full">
			<RowView align="center" justify="between" className="w-full py-2">
				<p className="font-semibold text-foreground/90">{item.nome}</p>
				<RowView align="center" className="gap-2">
					<button
						className="p-1 bg-extra-red/50 rounded-sm"
						onClick={() => remove(itemIndex)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-[18px]"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>
					</button>
					<button
						className="p-1 bg-secondary/70 rounded-sm disabled:bg-secondary/30"
						disabled={qtd === 1}
						onClick={() => decrease(itemIndex)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-[18px]"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
						</svg>
					</button>
					<span className="size-[18px] text-center">{qtd}</span>
					<button
						className="p-1 bg-secondary/70 rounded-sm disabled:bg-secondary/30"
						disabled={qtd === 99}
						onClick={() => increase(itemIndex)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-[18px]"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</button>
				</RowView>
			</RowView>
			<RowView align="baseline" className="text-sm w-full">
				<RowView className="gap-2">
					<p>{qtd}x</p>
					<p>{toPrice(item.preco)}</p>
				</RowView>
				<hr className="flex-1 border-b border-dotted mx-2" />
				<p className="font-semibold text-on-soft-green/80">{toPrice(qtd * item.preco)}</p>
			</RowView>
			<hr className="bg-[#BEBEBE] h-px w-full border-0 my-3" />
		</ColumnView>
	);
}

export default BagItem;
