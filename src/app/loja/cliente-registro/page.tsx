
import { Suspense } from "react";
import CustomerRegister from "./CustomerRegister";

export default function Page() {
	return (
		<Suspense fallback={null}>
			<CustomerRegister />
		</Suspense>
	);
}
