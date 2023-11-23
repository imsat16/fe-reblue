import { api, token } from "./api";

interface Pict {
    avatar : FormData
}
export async function getMyProfile() {
    try {
        const res = await api.get(`/user/profile`, {
            headers: {
                Authorization: `${token}`
            }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const changePict = async (pict:Pict) => {
    try {
        const res = await api.post(`/admin/artikel`, pict,
        {
            data: pict,
            headers:{
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },
        }
        );
        return res.data
    } catch (error:any) {
      // console.log("ini", error.response.data.message)
        throw new Error(error.response.data.message);
    }
}