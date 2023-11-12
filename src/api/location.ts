import { api, token } from "./api";

export async function getMyLocation() {
    try {
        const res = await api.get(`/user/location`, {
            headers: {
                Authorization: `${token}`
            }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}