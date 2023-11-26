import { api, token } from "./api";

type Item = {
    category_id: string
    name: string
}

type Name = {
    name: string
}

interface IdCategory {
    category_id: string
}

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

export async function getItemByCategory(id:IdCategory) {
    try {
        const res = await api.get(`/admin/itemList/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const addItem = async (req:Item) => {
    try {
        const res = await api.post(`/admin/itemTrash`, req,
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

export const deleteItem = async (id: any) => {
    try {
      const response = await api.delete(`/admin/itemTrash/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
};

export const changeItem = async (req:Name, id:string) => {
    try {
        const res = await api.put(`/admin/itemTrash/${id}`, req,
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