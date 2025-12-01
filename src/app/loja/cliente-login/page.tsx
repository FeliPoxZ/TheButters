
import { Suspense } from "react";
import CustomerLogin from "./CustomerLogin";

export default function Page() {
	return (
		<Suspense fallback={null}>
			<CustomerLogin />
		</Suspense>
	);
}
