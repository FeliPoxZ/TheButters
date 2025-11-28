"use client";

import { useEffect } from "react";
import AOS from "aos";
import ColumnView from "@/components/layout/ColumnView";
import CategoryNavBar from "@/components/ui/cardapio/CategoryNavBar";
import CategorySection from "@/components/ui/cardapio/CategorySection";
import Header from "@/components/ui/cardapio/Header";
import ProductModal from "@/components/ui/cardapio/ProductModal";
import Bag from "@/components/ui/cardapio/Bag";
import { mockData } from "@/tests/mockData";
import { isDevLocalClient } from "@/lib/mode";
import { useLojaStore } from "../stores/lojaStore";
import { useProdutosPorLoja } from "@/hooks/queries/useProdutosPorLoja";
import { CategorySkeleton, NavSkeleton } from "@/components/ui/skeletons";

export default function Cardapio() {
	useEffect(() => {
		AOS.init({
			duration: 400,
			once: true,
			easing: "ease-in-out",
			mirror: false,
		});
	}, []);

	const lojaId = useLojaStore((s) => s.lojaId);

	const { data: categorias, isLoading } = useProdutosPorLoja(lojaId);

	const selectedData = isDevLocalClient ? mockData : categorias;

	return (
		<ColumnView className="min-h-screen w-dvw select-none">
			<Header />
			{isLoading ? (
				<>
					<NavSkeleton />
					<CategorySkeleton />
				</>
			) : (
				<>
					<CategoryNavBar categories={isDevLocalClient ? mockData : categorias} />
					<div className="mt-6 mb-10">
						{selectedData &&
							selectedData.map((category) => (
								<CategorySection key={`${category.nome} section`} category={category} />
							))}
					</div>
				</>
			)}
			<Bag />
			<ProductModal />
		</ColumnView>
	);
}
