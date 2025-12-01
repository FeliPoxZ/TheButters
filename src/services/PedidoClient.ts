import { getToken } from "@/lib/utils";
import { PedidoCreateInput, PedidoResponse, PedidoUpdateInput } from "@/schemas/pedidoSchema";
import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

class PedidoClient {
	async create(data: PedidoCreateInput, token: string) {
		const res = await axiosInstance.post<
			PedidoResponse,
			AxiosResponse<PedidoResponse>,
			PedidoCreateInput
		>("/pedidos", data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res.data;
	}

	async getAll() {
		const res = await axiosInstance.get<PedidoResponse[]>(`/pedidos`, {
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});
		return res.data;
	}

	async getById(id: string) {
		const res = await axiosInstance.get<PedidoResponse>(`/pedidos/${id}`, {
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});
		return res.data;
	}

	async update(id: string, data: PedidoUpdateInput) {
		const res = await axiosInstance.put<
			PedidoResponse,
			AxiosResponse<PedidoResponse>,
			PedidoUpdateInput
		>(`/pedidos/${id}`, data, {
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});
		return res.data;
	}

	async delete(id: string) {
		const res = await axiosInstance.delete(`/pedidos/${id}`, {
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		return res.data;
	}
}

export default PedidoClient;
