import Line from "@/components/common/Line";
import Wrapper from "@/components/layout/Wrapper";

function Header() {
	return (
		<header className="w-full h-[30dvh]">
			<div className="bg-banner w-full h-1/2 border-b-3 border-b-secondary"></div>
			<section className="w-full h-1/2">
				<div className="w-full h-1/2">
					<Wrapper>
						<div></div>
					</Wrapper>
				</div>
				<Line />
				<div className="w-full">
					<Wrapper>
						<div className="flex flex-col py-3 gap-2">
							<div className="flex flex-row justify-between items-center">
								<p className="font-medium text-foreground/85">Aberto das 9h às 22h</p>
								<p className="font-medium text-secondary/90">Perfil da loja</p>
							</div>
							<div className="bg-soft-green w-full py-1 rounded-xs">
								<p className="text-on-soft-green font-semibold text-center">Loja Aberta</p>
							</div>
						</div>
					</Wrapper>
				</div>
			</section>
		</header>
	);
}

export default Header;
