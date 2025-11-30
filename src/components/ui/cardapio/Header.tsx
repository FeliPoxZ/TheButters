import { useCustomerStore } from "@/app/loja/stores/customerStore";
import Line from "@/components/common/Line";
import ColumnView from "@/components/layout/ColumnView";
import RowView from "@/components/layout/RowView";
import Wrapper from "@/components/layout/Wrapper";
import { cn } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/outline";
import ms from "ms";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

function Header() {
	const handleShare = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			toast.info("Link copiado para área de transferência!", {
				autoClose: ms("2s"),
			});
		} catch (err) {
			toast.error("Falha ao copiar o link.");
		}
	};

	const now = new Date();
	const hour = now.getHours();

	const customer = useCustomerStore((s) => s.customer);
	const pathname = usePathname()

	return (
		<header className="w-full h-auto">
			<div className="bg-banner w-full h-[17.5vh] border-b-4 md:border-b-6 border-b-secondary relative">
				<div className="h-full aspect-auto">
					<Image src={"/Capivara.webp"} alt="banner" fill priority className="object-contain" />
				</div>
			</div>
			<section className="w-full">
				<Wrapper>
					<RowView justify="between" align="center" className="h-full py-3">
						<RowView align="center" className="gap-2">
							<div className="relative h-20 md:h-30 border-2 border-white aspect-square rounded-full bg-primary -mt-10 md:-mt-20">
								<Image src={"/Logo.webp"} alt="logo" fill priority className="object-contain" />
							</div>
							<h1 className="font-poppins font-semibold text-foreground/80 text-[1.4rem] md:text-3xl">
								The Butters
							</h1>
						</RowView>
						<RowView className="gap-2 md:gap-4 text-extra-orange">
							<RowView align="center" className={cn(customer && "gap-2")}>
								<p className="text-lg">{customer ? customer.nome : ""}</p>
								<Link href={`/loja/cliente${customer? "" : "-login"}?redirect=${pathname}` } className="flex justify-center items-center cursor-pointer rounded-full bg-banner/55 size-10 transition-all duration-200 hover:scale-110 shadow-sm">
									<UserIcon className="size-6 text-inherit" />
								</Link>
							</RowView>
							<button
								onClick={handleShare}
								className="flex justify-center items-center cursor-pointer rounded-full bg-banner/55 size-10 transition-all duration-200 hover:scale-110 shadow-sm"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-6 text-inherit -ml-px"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
									/>
								</svg>
							</button>
						</RowView>
					</RowView>
				</Wrapper>
				<Line />
				<Wrapper>
					<ColumnView className="pt-3 mb-4 gap-2">
						<RowView justify="between" align="center" className="w-full">
							<p className="font-medium text-foreground/85">Aberto das 9h às 22h</p>
							<Link
								target="_blank"
								href={"https://www.instagram.com/thebuttersrp/"}
								className="font-medium text-extra-orange/90 cursor-pointer py-1 transition-all duration-200 hover:scale-105"
							>
								Perfil da loja
							</Link>
						</RowView>
						{hour >= 9 && hour < 22 ? (
							<div className={"bg-soft-green w-full py-1 md:py-2 rounded-sm"}>
								<p className="text-on-soft-green font-semibold text-center">
									Loja Aberta • Faça Seu Pedido!
								</p>
							</div>
						) : (
							<div className={"bg-soft-red w-full py-1 md:py-2 rounded-sm"}>
								<p className="text-on-soft-red/90 font-semibold text-center">
									Loja Fechada • Abre Novamente Amanhã às 9:00
								</p>
							</div>
						)}
					</ColumnView>
				</Wrapper>
			</section>
		</header>
	);
}

export default Header;
