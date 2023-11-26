import { api, token } from "./api";

interface Pict {
    avatar : FormData | null
}

interface Info {
    email : string
    gender : 'Pria' | 'Wanita'
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
        const res = await api.put(`/user/avatar`, pict,
        {
            data: pict,
            headers:{
                'Content-Type': 'multipart/form-data',
                Authorization: `${token}`
            },
        }
        );
        return res.data
    } catch (error:any) {
      
        throw new Error(error.response.data.message);
    }
}

export const changeInfo = async (req:Info) => {
    try {
        const res = await api.put(`/user/bio_data`, req,
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