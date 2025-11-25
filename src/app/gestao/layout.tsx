import QueryProvider from "@/components/common/QueryProvider";
import React from "react";

export default function GestaoLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<QueryProvider>
            {children}
        </QueryProvider>
	);
}
