interface Loja {
	id: string;
	cnpj: string;
	nome: string;
	endereco?:
		| {
				id: string;
				rua: string;
				numero: string;
				cidade: string;
		  }
		| null
		| undefined;
}
