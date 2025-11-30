// clients/ProdutoClient.ts
import { getToken } from "@/lib/utils";
import axios, { AxiosResponse } from "axios";

const publicAPI = process.env.NEXT_PUBLIC_API_URL_PUBLIC;
const privateAPI = process.env.NEXT_PUBLIC_API_URL;

class ProdutoClient {
	// GET produtos de uma loja (público)
	getAllByLoja = async (lojaId: string) => {
		try {
			const res = await axios.get<ApiProduct[] | null>(
				`${publicAPI}/loja-produtos/produtoVariado/${lojaId}`
			);
			return res.data;
		} catch (err: any) {
			if (err?.response?.data) throw err.response.data as DefaultMessage;
			throw err as DefaultMessage;
		}
	};

	// CREATE produto (requere token)
	create = async (data: any) => {
		try {
			const res = await axios.post(`${privateAPI}/produtos`, data, {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});
			return res.data;
		} catch (err: any) {
			if (err?.response?.data) throw err.response.data as DefaultMessage;
			throw err as DefaultMessage;
		}
	};

	// UPDATE produto
	update = async (uuid: string, data: any) => {
		try {
			const res = await axios.put(`${privateAPI}/produtos/${uuid}`, data, {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});
			return res.data;
		} catch (err: any) {
			if (err?.response?.data) throw err.response.data as DefaultMessage;
			throw err as DefaultMessage;
		}
	};

	// DELETE produto
	delete = async (uuid: string) => {
		try {
			await axios.delete(`${privateAPI}/produtos/${uuid}`, {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});
		} catch (err: any) {
			if (err?.response?.data) throw err.response.data as DefaultMessage;
			throw err as DefaultMessage;
		}
	};

	// ADD produto à loja (single)
	addToLoja = async (produtoid: string, lojaid: string) => {
		try {
			const res = await axios.post(
				`${privateAPI}/loja-produtos`,
				{ produtoid, lojaid },
				{
					headers: { Authorization: `Bearer ${getToken()}` },
				}
			);
			return res.data;
		} catch (err: any) {
			if (err?.response?.data) throw err.response.data as DefaultMessage;
			throw err as DefaultMessage;
		}
	};

	// ADD produtos à loja (bulk)
	addToLojaBulk = async (items: { produtoid: string; lojaid: string }[]) => {
		try {
			const res = await axios.post(
				`${privateAPI}/loja-produtos/bulk`,
				{ lojaprodutos: items },
				{ headers: { Authorization: `Bearer ${getToken()}` } }
			);
			return res.data;
		} catch (err: any) {
			if (err?.response?.data) throw err.response.data as DefaultMessage;
			throw err as DefaultMessage;
		}
	};
}

export default ProdutoClient;
