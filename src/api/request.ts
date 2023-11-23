import { api, token } from "./api";

type RequestJemput = {
    location_id : string;
    items: Item;
    image: FormData | null;
}

type Item = {
    category_id : string;
    item_id: string;
    weight: number
}

export const reqJemput = async (req:RequestJemput) => {
    try {
        const res = await api.post(`/reput/request`, req,
        {
            data: req,
            headers:{
                'Content-Type': 'multipart/form-data',
                Authorization: `${token}`
            },
        }
        );
        return res.data
    } catch (error:any) {
      // console.log("ini", error.response.data.message)
        throw new Error(error.response.data.message);
    }
}

export async function getMyReq(status?:string) {
    try {
        const res = await api.get(`/reput/my_data_req${status && `?status=${status}`}`, {
            headers: {
                Authorization: `${token}`
            }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getDetailReq(id:string) {
    try {
        const res = await api.get(`/reput/by_id/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}