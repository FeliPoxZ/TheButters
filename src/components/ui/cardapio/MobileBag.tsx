import { cn } from "@/lib/utils";
import { useState } from "react";

function MobileBag() {
	const [isBagOpen, setBagOpen] = useState(true);

	return (
		<>
			<style jsx>{`
            .bag-button::before {
                content: "";
                position: absolute;
                width: 40px;
                height: 50%;
                background-color: transparent;
                left: -30px;
                bottom: -10px;
                border-bottom-right-radius: 50px;
                border-bottom: 10px solid var(--banner);
                border-right: 10px solid var(--banner);
            }
            .bag-bar-mobile {
                filter: drop-shadow(0 0 8px #00000050);
            }
        `}</style>
			<aside
				className={cn(
					"fixed w-full h-1/5 bg-banner border-t-6 border-t-secondary transition-all duration-300 bag-bar-mobile",
					isBagOpen ? "bottom-0" : "-bottom-1/5"
				)}
			>
				<div className="relative w-full h-full">
					<button
						onClick={() => setBagOpen(!isBagOpen)}
						className="absolute bg-banner size-14 -top-14 right-0 rounded-tl-[50%] bag-button flex justify-center items-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-8 ml-1.5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
							/>
						</svg>
					</button>
					<div></div>
				</div>
			</aside>
		</>
	);
}

export default MobileBag;
