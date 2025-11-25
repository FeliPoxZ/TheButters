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

export default function Cardapio() {
	useEffect(() => {
		AOS.init({
			duration: 400,
			once: true,
			easing: "ease-in-out",
			mirror: false,
		});
	}, []);

	return (
		<ColumnView className="min-h-screen w-dvw select-none">
			<Header />
			<CategoryNavBar categories={mockData} />
			<div className="mt-6 mb-10">
				{mockData.map((category) => (
					<CategorySection key={`${category.nome} section`} category={category} />
				))}
			</div>
			<Bag />
			<ProductModal />
		</ColumnView>
	);
}
