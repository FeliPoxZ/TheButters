interface Product {
    id: string
    nome: string
    descricao: string
    preco: number
    imagemc?: string
    lojaIds?: string[];
    categoriaId?: string;
}