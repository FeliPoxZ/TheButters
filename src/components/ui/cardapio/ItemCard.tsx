import ColumnView from "@/components/layout/ColumnView";
import RowView from "@/components/layout/RowView";
import Image from "next/image";

interface Props {
	item: Product;
}

function ItemCard({ item }: Props) {
	const price = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(item.preco);

	return (
		<div data-aos="fade" className="px-3 md:px-4 py-3 rounded-lg bg-item min-h-30 w-full max-w-[430px] shadow-md">
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
		</div>
	);
}

export default ItemCard;
