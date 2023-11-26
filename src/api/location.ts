import { api, token } from "./api";

interface Location {
    label: string,
    address: string,
    note?: string,
    recipient?: string,
    contact?: string
}
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

export async function getDetailLocation(id:string) {
    try {
        const res = await api.get(`/user/location/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const createLocation = async (req:Location) => {
    try {
        const res = await api.post(`/user/location`, req,
        {
            data: req,
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

export const changeLocation = async (req:Location, id:string) => {
    try {
        const res = await api.put(`/user/location/${id}`, req,
        {
            data: req,
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

export const removeLocation = async (id:string) => {
    try {
        const res = await api.delete(`/user/location/${id}`,
        {
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