import axios, { AxiosResponse } from "axios";

const publicAPI = process.env.NEXT_PUBLIC_API_URL_PUBLIC;
const privateAPI = process.env.NEXT_PUBLIC_API_URL;

class ProdutoClient {
	getAllByLoja = async (lojaId: string) => {
		try {
			const res = await axios.get<ApiProduct[] | null>(publicAPI + `/loja-produtos/produtoVariado/${lojaId}`);

			return res.data;
		} catch (err: any) {
			if (err?.response?.data) {
				throw err.response.data as DefaultMessage;
			}
			throw err as DefaultMessage;
		}
	};

	/* get = async (uuid: string) => {
		try {
			const res = await axios.get<LojaResponse>(privateAPI + `/lojas/${uuid}`, {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});

			return res.data;
		} catch (err: any) {
			if (err?.response?.data) {
				throw err.response.data as DefaultMessage;
			}
			throw err as DefaultMessage;
		}
	};

	create = async (data: LojaCreateInput) => {
		try {
			const res = await axios.post<LojaResponse, AxiosResponse<LojaResponse>, LojaCreateInput>(
				privateAPI + "/lojas",
				data,
				{
					headers: {
						Authorization: `Bearer ${getToken()}`,
					},
				}
			);

			return res.data;
		} catch (err: any) {
			if (err?.response?.data) {
				throw err.response.data as DefaultMessage;
			}
			throw err as DefaultMessage;
		}
	};

	update = async (data: LojaUpdateInput, uuid: string) => {
		try {
			const res = await axios.put<LojaResponse, AxiosResponse<LojaResponse>, LojaUpdateInput>(
				privateAPI + `/lojas/${uuid}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${getToken()}`,
					},
				}
			);

			return res.data;
		} catch (err: any) {
			if (err?.response?.data) {
				throw err.response.data as DefaultMessage;
			}
			throw err as DefaultMessage;
		}
	};

	delete = async (uuid: string) => {
		try {
			await axios.delete(privateAPI + `/lojas/${uuid}`, {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});
		} catch (err: any) {
			if (err?.response?.data) {
				throw err.response.data as DefaultMessage;
			}
			throw err as DefaultMessage;
		}
	}; */
}

export default ProdutoClient;
