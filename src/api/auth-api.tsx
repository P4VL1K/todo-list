import axios from "axios";
import {ResponseType} from "./todolists-api";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'd5adea60-9bd3-42bf-aef9-f6ec89a799fa'
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