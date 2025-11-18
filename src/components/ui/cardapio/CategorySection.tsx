import Line from "@/components/common/Line";
import Wrapper from "@/components/layout/Wrapper";
import ItemCard from "./ItemCard";

interface Props {
	category: Category;
}

function CategorySection({ category }: Props) {
	return (
		<section id={`${category.nome}`}>
			<Wrapper>
				<h2 className="text-xl md:text-2xl font-semibold font-poppins text-foreground/85">{category.nome}</h2>
				<Line />
				<div className="my-4 gap-4 flex flex-col md:flex-row md:flex-wrap">
					{category.produtos.map((product) => (
						<ItemCard key={`${product.nome} product`} item={product} />
					))}
				</div>
			</Wrapper>
		</section>
	);
}

export default CategorySection;
