import { api, token } from "./api";

type UserData = {
    role: string
}

export async function getUserData(status?:string, id?: string) {
    try {
        const res = await api.get(`/admin/userData${status ? `?role=${status}` : ''}${id ? `/${id}` : ''}`, {
            headers: {
                Authorization: `${token}`
            }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const changeUserData = async (req:UserData, id:string) => {
    try {
        const res = await api.put(`/admin/userData/${id}`, req,
        {
            data: req,
            headers:{
                Authorization: `${token}`
            },
        }
        );
        return res.data
    } catch (error:any) {
      
        throw new Error(error.response.data.message);
    }
}