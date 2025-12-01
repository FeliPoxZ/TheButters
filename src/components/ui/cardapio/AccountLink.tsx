import { useCustomerStore } from "@/app/loja/stores/customerStore";
import { cn } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Props {
	redirect: string;
}

function AccountLink({ redirect }: Props) {
	const customer = useCustomerStore((s) => s.customer);

	return (
		<div className={cn("flex flex-col-reverse sm:flex-row items-center", customer && "gap-1 sm:gap-2", "text-extra-orange")}>
			<p className="text-lg">{customer ? customer.nome : ""}</p>
			<Link
				href={`/loja/cliente${customer ? "" : "-login"}?redirect=${redirect}`}
				className="flex justify-center items-center cursor-pointer rounded-full bg-banner/55 size-10 transition-all duration-200 hover:scale-110 shadow-sm"
			>
				<UserIcon className="size-6 text-inherit" />
			</Link>
		</div>
	);
}

export default AccountLink;
