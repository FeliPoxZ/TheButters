import Line from "@/components/common/Line";
import Wrapper from "@/components/layout/Wrapper";
import ProductCard from "./ProductCard";

interface Props {
	category: Category;
}

function CategorySection({ category }: Props) {
	return (
		<section id={`${category.nome}`} className="scroll-mt-16">
			<Wrapper>
				<h2 data-aos="fade" className="text-xl md:text-2xl font-semibold font-poppins text-foreground/85">{category.nome}</h2>
				<Line aosAnimate/>
				<div className="my-4 md:my-6 gap-5 flex flex-col md:flex-row md:flex-wrap">
					{category.produtos.map((product) => (
						<ProductCard key={`${product.nome} product`} item={product} />
					))}
				</div>
			</Wrapper>
		</section>
	);
}

export default CategorySection;
