interface LoginResponse {
	token: string;
	user: UserSummary;
}

interface LoginInput {
	email: string;
	senha: string;
}

interface RegisterInput {
	email: string;
	senha: string;
	nome: string;
	sobrenome: string;
	idade: number;
	cpf: string;
	numerocell: string;
	iszap?: boolean;
	lojaid?: string | null;
}

interface CreateUserInput extends RegisterInput {
	tipo: string;
}

interface UserResponse {
	id: string;
	nome: string;
	sobrenome: string;
	email: string;
	tipo: string;
	numerocell: string;
	iszap: boolean;
	cpf: string;
	status: string;
	idade: number;
	loja?: any | null; // adapte conforme o seu LojaResponse
}

interface UserUpdateInput {
	email?: string;
	senha?: string;
	nome?: string;
	sobrenome?: string;
	idade?: number;
	cpf?: string;
	tipo?: string;
	status?: string;
	numerocell?: string;
	iszap?: boolean;
	lojaid?: string | null;
}
