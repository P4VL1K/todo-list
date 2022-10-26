import axios from "axios";
import {ResponseType} from "./todolists-api";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c89dcbe5-0368-482a-9300-ed145f7cdf2f'
    }
})

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authAPI = {
    login (data: LoginParamsType) {
        return instance.post<ResponseType<{userID?: number}>>('/auth/login', data)
    },
    me () {
        return instance.get<ResponseType<{ id: number, email: string, login: string}>>('auth/me')
    },
    logout () {
       return instance.delete<ResponseType<{userID?: number}>>('/auth/login')
    }
}