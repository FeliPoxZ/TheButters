import { ReactElement } from "react";

interface Props {
	children: ReactElement;
}

function Wrapper({ children }: Props) {
	return <div className="w-dvw h-fit px-2">{children}</div>;
}

export default Wrapper;
