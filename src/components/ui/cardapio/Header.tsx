import Line from "@/components/common/Line";
import Wrapper from "@/components/layout/Wrapper";
import Image from "next/image";

function Header() {
    return (
        <header className="w-full h-[35vh]">
            <div className="bg-banner w-full h-1/2 border-b-4 md:border-b-6 border-b-secondary relative">
                <div className="h-full aspect-auto">
                    <Image
                        src={"/Capivara.webp"}
                        alt="banner"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
            <section className="w-full h-1/2">
                <div className="w-full h-2/5">
                    <Wrapper>
                        <div className="flex justify-between items-center h-full">
                            <div>
                                <h1 className="font-poppins font-semibold text-foreground/80 text-2xl md:text-3xl">
                                    The Butters
                                </h1>
                            </div>
                            <div className="flex gap-2 md:gap-4">
                                <button className="cursor-pointer rounded-full bg-banner/55 aspect-square h-10"></button>
                                <button className="cursor-pointer rounded-full bg-banner/55 aspect-square h-10"></button>
                            </div>
                        </div>
                    </Wrapper>
                </div>
                <Line />
                <div className="w-full">
                    <Wrapper>
                        <div className="flex flex-col py-3 gap-2">
                            <div className="flex flex-row justify-between items-center">
                                <p className="font-medium text-foreground/85">
                                    Aberto das 9h às 22h
                                </p>
                                <button className="font-medium text-extra-orange/90 cursor-pointer py-1">
                                    Perfil da loja
                                </button>
                            </div>
                            <div className="bg-soft-green w-full py-1 rounded-xs">
                                <p className="text-on-soft-green font-semibold text-center">
                                    Loja Aberta
                                </p>
                            </div>
                        </div>
                    </Wrapper>
                </div>
            </section>
        </header>
    );
}

export default Header;
