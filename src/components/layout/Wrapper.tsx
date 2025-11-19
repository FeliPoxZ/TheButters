import { ReactNode } from "react";

interface Props {
	children: ReactNode | ReactNode[];
}

function Wrapper({ children }: Props) {
	return <div className="w-dvw h-full px-4 md:px-10">{children}</div>;
}

export default Wrapper;
