
import { Suspense } from "react";
import CustomerMenuPage from "./CustomerMenuPage";

export default function Page() {
	return (
		<Suspense fallback={null}>
			<CustomerMenuPage/>
		</Suspense>
	);
}
