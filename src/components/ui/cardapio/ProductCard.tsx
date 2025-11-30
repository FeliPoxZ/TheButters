import ColumnView from "@/components/layout/ColumnView";
import RowView from "@/components/layout/RowView";
import { cn } from "@/lib/utils";
import { useProductModalStore } from "@/app/loja/[slug]/stores/productModalStore";
import Image from "next/image";

interface Props {
	item: Product;
}

function ProductCard({ item }: Props) {
	const price = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(item.preco);

	const toggleProductModal = useProductModalStore((s) => s.toggleProductModal);

	return (
		<div data-aos="fade">
			<button
				className={cn(
					"px-3 md:px-4 py-3 min-h-30 max-w-full w-[430px] rounded-lg bg-item text-left shadow-md cursor-pointer",
					"md:hover:shadow-lg md:hover:scale-105 transition-all duration-250"
				)}
				onClick={() => toggleProductModal(item)}
			>
				<RowView className="h-full" align="center">
					<ColumnView justify="around" className="gap-3 w-full h-full">
						<h3 className="font-semibold text-foreground/80 text-lg">{item.nome}</h3>
						<p className="text-foreground/90">{item.descricao}</p>
						<p className="font-semibold text-on-soft-green/90">{price}</p>
					</ColumnView>
					<div className="h-[150px] w-[150px] min-w-[150px] my-2 ml-3">
						<Image
							alt=""
							src={"/CookiePlaceholder.png"}
							height={150}
							width={150}
							className="rounded-lg h-full w-full object-cover"
						/>
					</div>
				</RowView>
			</button>
		</div>
	);
}

export default ProductCard;
