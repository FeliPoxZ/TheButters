import { Modal } from "@/components/common/Modal";
import ColumnView from "@/components/layout/ColumnView";
import RowView from "@/components/layout/RowView";
import { useProductModalStore } from "@/app/[slug]/stores/productModalStore";
import useBagStore from "@/app/[slug]/stores/useBagStore";
import ms from "ms";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

function ProductModal() {
	const item = useProductModalStore((s) => s.item);
	const isOpen = useProductModalStore((s) => s.isOpen);
	const toggleProductModal = useProductModalStore((s) => s.toggleProductModal);

	const [isLoading, setLoading] = useState(false);

	const price = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(item ? item.preco : 0);

	const addToBag = useBagStore((s) => s.addToBag);

	const handleClick = () => {
		if (item) {
			setLoading(true);
			addToBag(item);
			setTimeout(() => {
				setLoading(false);
				toggleProductModal();
				toast.info("Produto adicionado!");
			}, ms("200ms"));
		}
	};

	return (
		<Modal open={isOpen} onBackdropClick={() => toggleProductModal()}>
			<div className="bg-item w-[700px] max-w-[90vw] h-[600px] md:h-[400px] max-h-[80vh] rounded-2xl relative shadow-2xl">
				<button
					className="absolute right-0 cursor-pointer p-2"
					onClick={() => toggleProductModal()}
					disabled={isLoading}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-6"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
				<ColumnView justify="between" className="h-full p-8 overflow-y-auto">
					{item ? (
						<div className="flex flex-col md:flex-row items-center">
							<ColumnView justify="around" className="gap-3 w-full md:h-full">
								<h3 className="font-semibold text-foreground/80 text-xl md:text-2xl">
									{item.nome}
								</h3>
								<p className="text-foreground/90 text-lg md:text-xl">{item.descricao}</p>
								<p className="font-semibold text-on-soft-green/90 text-lg md:text-xl">{price}</p>
							</ColumnView>
							<div className="h-[250px] w-[250px] min-w-[250px] my-4 md:my-2 md:ml-3">
								<Image
									alt=""
									src={"/CookiePlaceholder.png"}
									height={250}
									width={250}
									className="rounded-lg h-full w-full object-cover"
								/>
							</div>
						</div>
					) : null}
					<button
						onClick={handleClick}
						disabled={isLoading}
						className="self-center w-full cursor-pointer bg-secondary/70 py-3 rounded-xl transition-all duration-300 hover:bg-secondary/90 shadow-sm disabled:bg-secondary/30"
					>
						<RowView align="center" justify="center" className="gap-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
								/>
							</svg>
							<p className="font-medium text-lg">Adicionar ao Pedido</p>
						</RowView>
					</button>
				</ColumnView>
			</div>
		</Modal>
	);
}

export default ProductModal;
