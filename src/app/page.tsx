import ColumnView from "@/components/layout/ColumnView";
import CategoryNavBar from "@/components/ui/cardapio/CategoryNavBar";
import Header from "@/components/ui/cardapio/Header";

export default function Home() {
	const categories = ["Cookies Clássicos", "Big Cookies", "Cheesecakes", "Lanches", "Bebidas"]
	return (
		<ColumnView className="min-h-screen w-dvw select-none">
			<Header />
			<CategoryNavBar categories={categories}/>
		</ColumnView>
	);
}
