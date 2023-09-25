import axios from 'axios';

import { parseCookies } from "nookies";

export const api = axios.create({
    baseURL: process.env.base_URL
    // baseURL: `https://${window.location.hostname}/api`
    //  baseURL: typeof window !== 'undefined' ? `http://${window.location.hostname}:9000/api` : ''
})

const cookies = parseCookies();
export const token = cookies.token