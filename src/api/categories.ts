import { api, token } from "./api";

type Category = {
    name : String
}

export async function getAllCategories() {
    try {
        const res = await api.get(`/admin/categoryTrash`, {
            headers: {
                Authorization: `${token}`
            }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getOneCategory(id:number | string) {
    try {
        const res = await api.get(`/admin/categoryTrash/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const addCategory = async (e:Category) => {
    try {
        const res = await api.post(`/admin/categoryTrash`, e,
        {
            data: e,
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

export const deleteCategories = async (id: any) => {
    try {
        const response = await api.delete(`/admin/categoryTrash/${id}`, {
        headers: {
            Authorization: `${token}`,
        },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const changeCategories = async (req:Category, path:string) => {
    try {
        const res = await api.put(`/admin/categoryTrash/${path}`, req,
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