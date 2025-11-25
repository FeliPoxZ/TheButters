"use client";

import { ProgressProvider } from "@bprogress/next/app";
import ms from "ms";
import { Bounce, ToastContainer } from "react-toastify";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ProgressProvider height="4px" color="#ff8b2f" options={{ showSpinner: false }} shallowRouting>
			{children}
			<ToastContainer
				position="top-center"
				autoClose={ms('1.5s')}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={false}
				pauseOnHover={false}
				theme="light"
				transition={Bounce}
			/>
		</ProgressProvider>
	);
};

export default Providers;
