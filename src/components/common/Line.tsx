import { cn } from "@/lib/utils";

interface Props {
	aosAnimate?: boolean;
	className?: string
}

function Line({ aosAnimate = false, className }: Props) {
	return (
		<hr
			className={cn(className,"bg-[#BEBEBE] h-0.5 w-full border-0")}
			{...(aosAnimate ? { "data-aos": "fade" } : {})}
		/>
	);
}

export default Line;
