import { LoginInput, LoginResponse, RegisterInput } from "@/schemas/userSchema";
import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL_PUBLIC,
});

class AuthClient {
	login = async (loginData: LoginInput, secure = false) => {
		try {
			const res = await axiosInstance.post<LoginResponse, AxiosResponse<LoginResponse>, LoginInput>(
				"/usuarios/login",
				loginData
			);

			const data = res.data;

			if (secure && data.user.tipo === "CL") {
				throw { message: "Privilégios Insuficientes" } satisfies DefaultMessage;
			}

			return data;
		} catch (err: any) {
			if (err?.response?.data) {
				throw err.response.data as DefaultMessage;
			}
			throw err as DefaultMessage;
		}
	};
	register = async (registerData: RegisterInput) => {
		return axiosInstance.post<DefaultMessage, AxiosResponse<DefaultMessage>, RegisterInput>(
			"/usuarios/register",
			registerData
		);
	};
}

export default AuthClient;
