import { useAuthStore } from "@/app/gestao/stores/authStore";
import ColumnView from "@/components/layout/ColumnView";
import RowView from "@/components/layout/RowView";
import Link from "next/link";

function ExtraHeader() {

    const logout = useAuthStore(s => s.logout)
    const user = useAuthStore(s => s.user)

	const handleLogout = () => {
		document.cookie = [
			"token=",
			"path=/",
			window.location.protocol === "https:" ? "secure" : "",
			"max-age=0",
		].join("; ");

		logout()
	};

	return (
		<RowView align="center" className="text-foreground gap-6">
			<Link href={"/gestao/account"}>
				<ColumnView align="center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-8 text-foreground/80"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
						/>
					</svg>

					<p className="text-sm text-foreground/80 text-center">{user ? user?.nome : "User"}</p>
				</ColumnView>
			</Link>

			<Link href={"/gestao/auth"} onClick={handleLogout}>
				<ColumnView align="center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-8 text-foreground/80"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
						/>
					</svg>
					<p className="text-sm text-foreground/80 text-center">Sair</p>
				</ColumnView>
			</Link>
		</RowView>
	);
}

export default ExtraHeader;
