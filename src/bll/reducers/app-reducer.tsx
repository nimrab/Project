import {ActionType} from "../action-dispatchTypes";
import {Dispatch} from "redux";
import {authApi} from "../../dal/api/auth-api";
import {authMeAC} from "./auth-reducer";


type StateType = {
    isFetching: boolean
    isInitialized: boolean
    error: string | null
}

const initialState: StateType = {
    isFetching: false,
    isInitialized: false,
    error: null as string | null,
}

export const appReducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case "APP/TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "APP/SET-INITIALIZE":
            return {...state, isInitialized: action.value}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const toggleIsFetchingAC = (isFetching: boolean) => {
    return {
        type: "APP/TOGGLE-IS-FETCHING",
        isFetching
    } as const
}

export const setAppInitializeAC = (value: boolean) => {
    return {
        type: 'APP/SET-INITIALIZE',
        value
    } as const
}


export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}


export const appInitializeTC = () => (dispatch: Dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    authApi.authMe()
        .then(res => {
            dispatch(authMeAC(res.data))
        })
        .catch(() => {

        })
        .finally(() => {
            dispatch(setAppInitializeAC(true))
            dispatch(toggleIsFetchingAC(false))
        })
}




