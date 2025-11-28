import { cn } from "@/lib/utils"

interface Props {
	roundedTop?: boolean
}

function CommonFooter({roundedTop = false}: Props) {
	return (
		<footer className={cn("mt-6 px-6 py-3 text-xs text-center bg-banner text-foreground/90 font-medium", roundedTop? "rounded-xl" : "rounded-b-xl")}>
			Todos os direitos reservados • The Butters® 2025
		</footer>
	);
}

export default CommonFooter;
