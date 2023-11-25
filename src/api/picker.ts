import { api, token } from "./api";

export const confirmRequest = async (id:string) => {
    try {
        const res = await api.put(`/reput/pick/${id}`, id, {
            data: id,
            headers:{
                Authorization: `${token}`
            },
        });
        return res.data
    } catch (error:any) {
        throw new Error(error.response.data.message);
    }
}

export const doneRequest = async (id:string) => {
    try {
        const res = await api.put(`/reput/done/${id}`,id,{
            data: id,
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

export const cancelRequest = async (id:string) => {
    try {
        const res = await api.delete(`/reput/cancel/${id}`,{
            headers:{
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
        }
        );
        return res.data
    } catch (error:any) {
        throw new Error(error.response.data.message);
    }
}