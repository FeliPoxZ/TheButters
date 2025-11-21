"use client";

import { useEffect } from "react";
import AOS from "aos";
import ColumnView from "@/components/layout/ColumnView";
import CategoryNavBar from "@/components/ui/cardapio/CategoryNavBar";
import CategorySection from "@/components/ui/cardapio/CategorySection";
import Header from "@/components/ui/cardapio/Header";
import ProductModal from "@/components/ui/cardapio/ProductModal";
import MobileBag from "@/components/ui/cardapio/MobileBag";

const mockData: Category[] = [
	{
		id: "1",
		nome: "Cookies Clássicos",
		descricao: "Cookies tradicionais feitos com ingredientes selecionados.",
		produtos: [
			{
				id: "1-1",
				nome: "Cookie Tradicional",
				descricao: "Cookie clássico com gotas de chocolate meio amargo.",
				preco: 8.9,
			},
			{
				id: "1-2",
				nome: "Cookie de Baunilha",
				descricao: "Cookie leve com essência natural de baunilha.",
				preco: 7.5,
			},
			{
				id: "1-3",
				nome: "Cookie de Amendoim",
				descricao: "Cookie crocante com pedaços de amendoim caramelizado.",
				preco: 9.0,
			},
		],
	},
	{
		id: "2",
		nome: "Big Cookies",
		descricao: "Cookies gigantes com recheios variados.",
		produtos: [
			{
				id: "2-1",
				nome: "Big Cookie Nutella",
				descricao: "Cookie gigante recheado com Nutella.",
				preco: 14.9,
			},
			{
				id: "2-2",
				nome: "Big Cookie Doce de Leite",
				descricao: "Cookie enorme com recheio cremoso de doce de leite.",
				preco: 13.5,
			},
			{
				id: "2-3",
				nome: "Big Cookie Red Velvet",
				descricao: "Cookie vermelho com recheio de cream cheese.",
				preco: 15.9,
			},
			{
				id: "2-4",
				nome: "Big Cookie Trufado",
				descricao: "Cookie com recheio trufado de chocolate belga.",
				preco: 16.9,
			},
		],
	},
	{
		id: "3",
		nome: "Cheesecakes",
		descricao: "Cheesecakes artesanais com sabores especiais.",
		produtos: [
			{
				id: "3-1",
				nome: "Cheesecake de Frutas Vermelhas",
				descricao: "Base crocante com creme suave e cobertura de frutas vermelhas.",
				preco: 19.9,
			},
			{
				id: "3-2",
				nome: "Cheesecake de Oreo",
				descricao: "Creme de cheesecake com pedaços de Oreo.",
				preco: 18.9,
			},
			{
				id: "3-3",
				nome: "Cheesecake de Limão",
				descricao: "Cheesecake refrescante com toque cítrico.",
				preco: 17.9,
			},
			{
				id: "3-4",
				nome: "Cheesecake Clássico",
				descricao: "O clássico cheesecake ao estilo americano.",
				preco: 16.9,
			},
			{
				id: "3-5",
				nome: "Cheesecake de Caramelo",
				descricao: "Cobertura de caramelo artesanal.",
				preco: 20.9,
			},
		],
	},
	{
		id: "4",
		nome: "Lanches",
		descricao: "Lanches rápidos feitos na hora.",
		produtos: [
			{
				id: "4-1",
				nome: "Sanduíche Natural",
				descricao: "Pão integral, peito de peru, alface e patê leve.",
				preco: 12.5,
			},
			{
				id: "4-2",
				nome: "Torrada Mista",
				descricao: "Queijo e presunto no pão de forma dourado.",
				preco: 10.0,
			},
		],
	},
	{
		id: "5",
		nome: "Salgados",
		descricao: "Salgados fresquinhos para qualquer momento.",
		produtos: [
			{
				id: "5-1",
				nome: "Coxinha de Frango",
				descricao: "Crocante por fora e cremosa por dentro.",
				preco: 7.5,
			},
			{
				id: "5-2",
				nome: "Esfirra de Carne",
				descricao: "Esfirra aberta com carne temperada.",
				preco: 6.9,
			},
			{
				id: "5-3",
				nome: "Kibe",
				descricao: "Kibe frito com recheio opcional de cream cheese.",
				preco: 6.5,
			},
			{
				id: "5-4",
				nome: "Enroladinho de Salsicha",
				descricao: "Massa fofinha recheada com salsicha.",
				preco: 5.9,
			},
		],
	},
	{
		id: "6",
		nome: "Bebidas",
		descricao: "Bebidas para acompanhar seu pedido.",
		produtos: [
			{
				id: "6-1",
				nome: "Refrigerante Lata",
				descricao: "Diversos sabores disponíveis.",
				preco: 6.0,
			},
			{
				id: "6-2",
				nome: "Água com Gás",
				descricao: "Garrafa de 500ml.",
				preco: 4.5,
			},
			{
				id: "6-3",
				nome: "Suco Natural",
				descricao: "Suco feito na hora (laranja ou limão).",
				preco: 8.9,
			},
		],
	},
	{
		id: "7",
		nome: "Soda Italiana",
		descricao: "Sodas artesanais refrescantes.",
		produtos: [
			{
				id: "7-1",
				nome: "Soda Italiana de Framboesa",
				descricao: "Bebida refrescante com xarope de framboesa.",
				preco: 12.9,
			},
			{
				id: "7-2",
				nome: "Soda Italiana de Limão Siciliano",
				descricao: "Leve e cítrica, feita com limão siciliano.",
				preco: 13.9,
			},
			{
				id: "7-3",
				nome: "Soda Italiana de Maçã Verde",
				descricao: "Doce e equilibrada, com aroma natural.",
				preco: 12.9,
			},
		],
	},
	{
		id: "8",
		nome: "Cafés e Cappuccinos",
		descricao: "Sodas artesanais refrescantes.",
		produtos: [
			{
				id: "8-1",
				nome: "Coado",
				descricao: "Café premium",
				preco: 12.9,
			},
			{
				id: "8-2",
				nome: "Latte",
				descricao: "Café espesso longo com leite",
				preco: 13.9,
			},
			{
				id: "8-3",
				nome: "Iced Cappuccino",
				descricao: "Cappuccino gelado da casa finalizado com chantilly artesanal",
				preco: 12.9,
			},
		],
	},
];

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
			<MobileBag /> 
			<ProductModal />
		</ColumnView>
	);
}
