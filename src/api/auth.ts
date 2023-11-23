import {api, token} from './api'

interface Otp {
    phone_number : string,
    otp: string
}

interface Login {
    phone_number : string,
}

interface Register {
    phone_number : string,
    name: string,
    role?: string
}

export const signup = async (e: Register) => {
    try {
        const res = await api.post(`/auth/register`, e, {
            data: e,
            headers:{
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`
            },
        });
        return res.data
    } catch (error:any) {
        // console.log(error.response.data.message)
        throw new Error(error.response.data.message);
    }
}

export const login = async (e: Login) => {
    try {
        const res = await api.post(`/auth/login`, e, {
            data: e,
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });
        return res.data
    } catch (error:any) {
        // console.log(error.response.data.message)
        throw new Error(error.response.data.message);
    }
}

export const verif = async (e: Otp) => {
    try {
        const res = await api.post(`/auth/verify-otp`, e, {
            data: e,
            headers:{
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`
            },
        });
        return res.data
    } catch (error:any) {
        // console.log(error.response.data.message)
        throw new Error(error.response.data.message);
    }
}