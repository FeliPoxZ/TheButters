interface ApiProduct {
	categoria: {
		id: string;
        nome: string;
        descricao: string;
	};
    produto: {
        id: string;
        nome: string;
        descricao: string;
        preco: number;
        imagemc: string;
    };
}