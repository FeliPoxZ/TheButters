import { Modal } from "@/components/common/Modal";
import ColumnView from "@/components/layout/ColumnView";
import RowView from "@/components/layout/RowView";
import { useItemModalStore } from "@/stores/itemModalStore";
import Image from "next/image";

function ItemModal() {
	const item = useItemModalStore((s) => s.item);
	const isOpen = useItemModalStore((s) => s.isOpen);
	const toggleItemModal = useItemModalStore((s) => s.toggleItemModal);

	const price = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(item ? item.preco : 0);

	return (
		<Modal open={isOpen} onBackdropClick={() => toggleItemModal()}>
			<div className="bg-item w-[700px] max-w-[80vw] h-[400px] max-h-[80vh] rounded-2xl relative shadow-2xl">
				<button className="absolute right-0 cursor-pointer p-2" onClick={() => toggleItemModal()}>
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
				<ColumnView justify="between" className="h-full p-8">
					{item ? (
						<RowView align="center">
							<ColumnView justify="around" className="gap-3 w-full h-full">
								<h3 className="font-semibold text-foreground/80 text-2xl">{item.nome}</h3>
								<p className="text-foreground/90 text-xl">{item.descricao}</p>
								<p className="font-semibold text-on-soft-green/90 text-xl">{price}</p>
							</ColumnView>
							<div className="h-[250px] w-[250px] min-w-[250px] my-2 ml-3">
								<Image
									alt=""
									src={"/CookiePlaceholder.png"}
									height={250}
									width={250}
									className="rounded-lg h-full w-full object-cover"
								/>
							</div>
						</RowView>
					) : null}
					<button className="self-center w-full cursor-pointer bg-secondary/70 py-3 rounded-xl transition-all duration-300 hover:bg-secondary/90 shadow-sm">
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

export default ItemModal;
