import ColumnView from "@/components/layout/ColumnView";
import CategoryNavBar from "@/components/ui/cardapio/CategoryNavBar";
import Header from "@/components/ui/cardapio/Header";

export default function Home() {
	const categories = ["Cookies Clássicos", "Big Cookies", "Cheesecakes", "Lanches", "Bebidas"];
	const items = Array.from({ length: 20 });
	return (
		<ColumnView className="min-h-screen w-dvw select-none">
			<Header />
			<CategoryNavBar categories={categories} />
			{categories.map((category) => (
				<div key={category}>
					<h2 id={category} className="scroll-mt-14">{category}</h2>
					{items.map((_, itensIndex) => (
						<p key={`${category} ${itensIndex}`}>a</p>
					))}
				</div>
			))}
		</ColumnView>
	);
}
