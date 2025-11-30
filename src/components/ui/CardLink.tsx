import Link from "next/link";
import { ReactNode } from "react";

interface Props {
	href: string;
	svg: ReactNode;
	title: string;
	description: string;
}

function CardLink({ href, svg, title, description }: Props) {
	return (
		<Link
			href={href}
			className="
					bg-banner/70 hover:bg-banner/90 
					rounded-xl shadow-md 
					border-2 border-secondary/40
					transition-all cursor-pointer 
					active:scale-[0.98]
					p-6 flex flex-col items-center justify-center text-center
				"
		>
			{svg}

			<h3 className="font-semibold text-lg text-foreground/80">{title}</h3>
			<p className="text-sm text-foreground/70 mt-1">{description}</p>
		</Link>
	);
}

export default CardLink;
