import {toggleIsFetchingAC} from "./app-reducer";
import {ActionType, DispatchType} from "../action-dispatchTypes";
import {authApi} from "../../dal/api/auth-api";
import {handleServerAppError} from "../../utils/error-utils";

export type UserType = {
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

type StateType = {
    isAuth: boolean
    user: UserType
    tokenIsSent: boolean
    passwordIsCreated: boolean
    sentPassword: string
}

const initialState: StateType = {
    isAuth: false,
    tokenIsSent: false,
    passwordIsCreated: false,
    sentPassword: '',
    user: {
        _id: "0",
        email: "fake",
        name: "fake",
        avatar: '',
        publicCardPacksCount: 0,
        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false,
        rememberMe: false
    }
}

export const authReducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case "AUTH/AUTH-ME":
            return {...state, user: action.user, isAuth: true}
        case "AUTH/DELETE-ME":
            return {...state, isAuth: false}
        case "AUTH/CHANGE-PROFILE":
            return {...state, user: {...state.user, name: action.name, avatar: action.avatar}}
        case "AUTH/SET-TOKEN-IS-SENT":
            return {...state, tokenIsSent: action.value}
        case "AUTH/SET-SENT-PASS":
            return {...state, sentPassword: action.value}
        case "AUTH/SET-PASS-IS-CREATED":
            return {...state, passwordIsCreated: action.value}
        default:
            return state
    }
}

export const authMeAC = (user: UserType) => {
    return {
        type: "AUTH/AUTH-ME",
        user
    } as const
}

export const signOutAC = () => {
    return {
        type: "AUTH/DELETE-ME",
    } as const
}

export const changeProfileAC = (name: string, avatar: string) => {
    return {
        type: "AUTH/CHANGE-PROFILE",
        name, avatar
    } as const
}


export const setTokenIsSentAC = (value: boolean) => {
    return {
        type: "AUTH/SET-TOKEN-IS-SENT",
        value
    } as const
}

export const setSentPassAC = (value: string) => {
    return {
        type: "AUTH/SET-SENT-PASS",
        value
    } as const
}

export const setPasswordIsCreatedAC = (value: boolean) => {
    return {
        type: "AUTH/SET-PASS-IS-CREATED",
        value
    } as const
}


export const authMeTC = () => async (dispatch: DispatchType) => {
    dispatch(toggleIsFetchingAC(true))
    try {
        const res = await authApi.authMe()
        dispatch(authMeAC(res.data))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
    }
    dispatch(toggleIsFetchingAC(false))
}

export const signOutTC = () => async (dispatch: DispatchType) => {
    dispatch(toggleIsFetchingAC(true))
    await authApi.signOut()
    dispatch(signOutAC())
    dispatch(toggleIsFetchingAC(false))
}

export const changeProfileTC = (name: string, avatar: string) => async (dispatch: DispatchType) => {
    dispatch(toggleIsFetchingAC(true))
    await authApi.changeMe(name, avatar)
    dispatch(changeProfileAC(name, avatar))
    dispatch(toggleIsFetchingAC(false))
}

export const sendTokenTC = (email: string) => async (dispatch: DispatchType) => {
    const message = "\n<div style=\"background-color: lime; padding: 15px\">\npassword recovery link: \n<a href=' https://Vladon79.github.io/Project/#/set-new-password/$token$'>link</a>\n</div>\n"
    try {
        await authApi.forgot(email, 'Password reset', message)
        dispatch(setSentPassAC(email))
    } catch (err) {
        handleServerAppError(dispatch, err)
    } finally {
        dispatch(toggleIsFetchingAC(false))
    }
}

export const setNewPass = (password: string, token: string | undefined) => async (dispatch: DispatchType) => {
    dispatch(toggleIsFetchingAC(true))
    try {
        await authApi.newPass(password, token)
        dispatch(setTokenIsSentAC(true))
        dispatch(setPasswordIsCreatedAC(true))
    } catch (err) {
        handleServerAppError(dispatch, err)
    } finally {
        dispatch(toggleIsFetchingAC(false))
    }
}