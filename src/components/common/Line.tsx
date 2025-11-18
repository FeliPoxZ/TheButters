interface Props {
	aosAnimate?: boolean;
}

function Line({ aosAnimate = false }: Props) {
	return (
		<hr
			className="bg-[#BEBEBE] h-0.5 w-full border-0"
			{...(aosAnimate ? { "data-aos": "fade" } : {})}
		/>
	);
}

export default Line;
