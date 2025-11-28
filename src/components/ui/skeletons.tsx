import Skeleton from "react-loading-skeleton";
import Wrapper from "../layout/Wrapper";
import Line from "../common/Line";

export function NavSkeleton() {
	return (
		<div className="w-dvw h-fit sticky -mt-1 pb-px shadow-lg z-10">
			<Skeleton
				width={"100dvw"}
				height={44}
				baseColor="var(--primary)"
				highlightColor="var(--dark-primary)"
			/>
		</div>
	);
}

export function CategorySkeleton() {
	const skeletons = ["p1", "p2", "p3", "p4", "p5", "p6"];

	return (
		<div className="mt-6 mb-10">
			<Wrapper>
				<Skeleton width={300} height={24} className="mb-1" baseColor="var(--item)" highlightColor="var(--background)" borderRadius={5}/>
				<Line />
				<div className="my-4 md:my-6 gap-5 flex flex-col md:flex-row md:flex-wrap">
					{skeletons.map((sk) => (
						<Skeleton key={sk} height={200} width={430} className="shadow-md max-w-full" borderRadius={10} baseColor="var(--item)" highlightColor="var(--background)"/>
					))}
				</div>
			</Wrapper>
		</div>
	);
}
