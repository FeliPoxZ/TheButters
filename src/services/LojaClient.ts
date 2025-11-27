import { getToken } from "@/lib/utils";
import { LojaCreateInput, LojaResponse } from "@/schemas/lojaSchema";
import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

class LojaClient {
	getAll = async () => {
		try {
			const res = await axiosInstance.get<LojaResponse[] | null>("/lojas", {
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

	get = async (uuid: string) => {
		try {
			const res = await axiosInstance.get<LojaResponse>(`/lojas/${uuid}`, {
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
			const res = await axiosInstance.post<
				LojaResponse,
				AxiosResponse<LojaResponse>,
				LojaCreateInput
			>("/lojas", data, {
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
}

export default LojaClient;
