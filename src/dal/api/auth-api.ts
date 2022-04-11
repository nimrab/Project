import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
        baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const authApi = {
    authMe() {
        return instance.post('/auth/me')
    },
    changeMe(name: string, avatar: string) {
        return instance.put('/auth/me', {
            name, avatar
        }).then(response => response.data)
    },
    singIn(data: SingInRequestType) {
        return instance.post<SingInRequestType, AxiosResponse<SingInResponseType>>("/auth/login", data)
    },
    signOut() {
        return instance.delete('/auth/me').then(response => response.data)
    },
    register(email: string, password: string) {
        return instance.post<RegisterResponseType>(`auth/register`, {email, password})
    },
    forgot(email: string, fromEmail: string, message: string) {
        return instance.post<ForgotResponseType>(`auth/forgot`, {email, fromEmail, message})
    },
    newPass(password: string, token: string | undefined) {
        return instance.post<newPassResponseType>(`auth/set-new-password`, {password, resetPasswordToken: token})
    }
}


type RegisterResponseType = {
    addedUser: AddedUserType
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean
    __v: number
    _id: string
}

type AddedUserType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
}


export type SingInRequestType = {
    email: string
    password: string
    rememberMe: boolean
}

export type SingInResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}

type ForgotResponseType = {
    info: string
    error: string
    in: string
}

type newPassResponseType = {}