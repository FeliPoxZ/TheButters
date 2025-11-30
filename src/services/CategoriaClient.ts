// clients/CategoriaClient.ts
import { getToken } from "@/lib/utils";
import axios from "axios";

const privateAPI = process.env.NEXT_PUBLIC_API_URL;

class CategoriaClient {
	// CREATE categoria
	create = async (data: any) => {
		try {
			const res = await axios.post(`${privateAPI}/categorias`, data, {
				headers: { Authorization: `Bearer ${getToken()}` },
			});
			return res.data;
		} catch (err: any) {
			if (err?.response?.data) throw err.response.data as DefaultMessage;
			throw err as DefaultMessage;
		}
	};

	// UPDATE categoria
	update = async (id: string, data: any) => {
		try {
			const res = await axios.put(`${privateAPI}/categoria/${id}`, data, {
				headers: { Authorization: `Bearer ${getToken()}` },
			});
			return res.data;
		} catch (err: any) {
			if (err?.response?.data) throw err.response.data as DefaultMessage;
			throw err as DefaultMessage;
		}
	};

	// GET todas categorias (pode criar endpoint público ou usar private)
	getAll = async () => {
		try {
			const res = await axios.get(`${privateAPI}/categorias`, {
				headers: { Authorization: `Bearer ${getToken()}` },
			});
			return res.data;
		} catch (err: any) {
			if (err?.response?.data) throw err.response.data as DefaultMessage;
			throw err as DefaultMessage;
		}
	};
}

export default CategoriaClient;
