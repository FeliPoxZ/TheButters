"use client";

import { useEffect } from "react";
import { useLojaStore } from "./stores/lojaStore";

export function InjectLojaId({ lojaId }: { lojaId: string }) {
	const setLojaId = useLojaStore((s) => s.setLojaId);

	useEffect(() => {
		setLojaId(lojaId);
	}, [lojaId]);

	return null;
}
