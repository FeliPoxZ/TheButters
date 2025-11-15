import Line from "@/components/common/Line";
import ColumnView from "@/components/layout/ColumnView";
import RowView from "@/components/layout/RowView";
import Wrapper from "@/components/layout/Wrapper";
import Image from "next/image";

function Header() {
	return (
		<header className="w-full h-[35vh]">
			<div className="bg-banner w-full h-1/2 border-b-4 md:border-b-6 border-b-secondary relative">
				<div className="h-full aspect-auto">
					<Image src={"/Capivara.webp"} alt="banner" fill priority  className="object-contain" />
				</div>
			</div>
			<section className="w-full h-1/2">
				<div className="w-full h-2/5">
					<Wrapper>
						<RowView justify="between" align="center" className="h-full">
							<RowView align="center" className="gap-2">
                                <div className="relative h-20 md:h-30 border-2 border-white aspect-square rounded-full bg-primary -mt-10 md:-mt-20">
                                    <Image src={"/Logo.webp"} alt="logo" fill priority  className="object-contain"/>
                                </div>
								<h1 className="font-poppins font-semibold text-foreground/80 text-[1.4rem] md:text-3xl">
									The Butters
								</h1>
							</RowView>
							<RowView className="gap-2 md:gap-4 text-extra-orange">
								<button className="flex justify-center items-center cursor-pointer rounded-full bg-banner/55 aspect-square h-10 transition-all duration-200 hover:scale-110 shadow-sm">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6 text-inherit"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
										/>
									</svg>
								</button>
								<button className="flex justify-center items-center cursor-pointer rounded-full bg-banner/55 aspect-square h-10 transition-all duration-200 hover:scale-110 shadow-sm">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6 text-inherit"
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
				</div>
				<Line />
				<div className="w-full">
					<Wrapper>
						<ColumnView className="py-3 gap-2">
							<RowView justify="between" align="center" className="w-full">
								<p className="font-medium text-foreground/85">Aberto das 9h às 22h</p>
								<button className="font-medium text-extra-orange/90 cursor-pointer py-1 transition-all duration-200 hover:scale-105">
									Perfil da loja
								</button>
							</RowView>
							<div className="bg-soft-green w-full py-1 md:py-2 rounded-xs">
								<p className="text-on-soft-green font-semibold text-center">Loja Aberta</p>
							</div>
						</ColumnView>
					</Wrapper>
				</div>
			</section>
		</header>
	);
}

export default Header;
