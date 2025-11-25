import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL_PUBLIC,
});

class AuthClient {
	login = async (loginData: LoginInput) => {
		try {
			const res = await axiosInstance.post<LoginResponse, AxiosResponse<LoginResponse>, LoginInput>(
				"/usuarios/login",
				loginData
			);

			return res.data;
		} catch (err: any) {
			console.log(err)
			throw err.response?.data as DefaultMessage;
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
