import Image from "next/image";
import RowView from "../layout/RowView";
import Line from "./Line";
import { ReactNode } from "react";

interface Props {
	extra?: ReactNode
}

function CommonHeader({extra}: Props) {
	return (
		<>
			<header className="w-full h-auto">
				<div className="bg-banner w-full h-[17.5vh] border-b-4 md:border-b-6 border-b-secondary relative">
					<div className="h-full aspect-auto">
						<Image src={"/Capivara.webp"} alt="banner" fill priority className="object-contain" />
					</div>
				</div>
				<section className="w-full px-6">
					<RowView justify={extra? "between" : "start"} align="center" className="h-full py-3">
						<div className="flex flex-col sm:flex-row gap-1 sm:gap-2 items-center">
							<div className="relative size-20 md:size-26 border-2 border-white  rounded-full bg-primary -mt-10 md:-mt-16">
								<Image src={"/Logo.webp"} alt="logo" fill priority className="object-contain" />
							</div>
							<h1 className="font-poppins font-semibold text-foreground/80 text-[1.4rem] md:text-3xl">
								The Butters
							</h1>
						</div>
						{extra}
					</RowView>
				</section>
			</header>
			<Line />
		</>
	);
}

export default CommonHeader;
