import RowView from "@/components/layout/RowView";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
	categories: string[];
}

function CategoryNavBar({ categories }: Props) {
	return (
		<nav className="bg-primary min-w-full py-2 sticky -top-px pl-5 md:pl-11 shadow-md overflow-x-auto">
			<RowView align="center" className="gap-6">
				{categories.map((category, i) => (
					<Link
						className={cn(
							"text-item text-lg md:text-xl transition-all hover:scale-105 duration-200 shrink-0",
							i === 0 ? "text-highlight font-medium" : ""
						)}
						key={category}
						href={""}
					>
						{category}
					</Link>
				))}
			</RowView>
		</nav>
	);
}

export default CategoryNavBar;
