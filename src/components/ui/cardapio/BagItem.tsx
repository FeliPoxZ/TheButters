import ColumnView from "@/components/layout/ColumnView";
import RowView from "@/components/layout/RowView";

function BagItem() {
	return (
		<ColumnView className="w-full">
			<RowView align="center" justify="between" className="w-full py-2">
				<p className="font-semibold text-foreground/90">Cookie Tradicional</p>
				<RowView align="center" className="gap-3">
					<button className="p-1 bg-secondary/70 rounded-sm">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-[18px]"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
						</svg>
					</button>
					<span>2</span>
					<button className="p-1 bg-secondary/70 rounded-sm">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-[18px]"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</button>
				</RowView>
			</RowView>
			<RowView align="baseline" className="text-sm w-full">
				<RowView className="gap-2">
					<p>2x</p>
					<p>R$ 5,00</p>
				</RowView>
				<hr className="flex-1 border-b border-dotted mx-2" />
				<p className="font-semibold text-on-soft-green/80">R$ 10,00</p>
			</RowView>
			<hr className="bg-[#BEBEBE] h-px w-full border-0 my-3" />
		</ColumnView>
	);
}

export default BagItem;
