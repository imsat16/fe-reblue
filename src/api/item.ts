import { api, token } from "./api";

export async function getItemList() {
    try {
        const res = await api.get(`/admin/itemList`, {
            headers: {
                Authorization: `${token}`
            }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}