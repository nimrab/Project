import {authApi} from "../../dal/api/auth-api";
import {toggleIsFetchingAC} from "./app-reducer";
import {DispatchType, signUpAT} from "../action-dispatchTypes";
import {handleServerAppError} from "../../utils/error-utils";


const initialState = {
    isRegistered: false
}
type InitialStateType = typeof initialState

export const singUpReducer = (state: InitialStateType = initialState, action: signUpAT): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-REGISTERED':
            return {...state, isRegistered: action.value}
        default:
            return state
    }
}


export const signUpAC = (value: boolean) => {
    return {
        type: 'SET-IS-REGISTERED',
        value
    } as const
}

export const register = (email: string, password: string) => (dispatch: DispatchType) => {

    dispatch(toggleIsFetchingAC(true))
    authApi.register(email, password)
        .then(() => {
            dispatch(signUpAC(true))
        })
        .catch(err => {
            handleServerAppError(dispatch, err)
        })
        .finally(() => {
            dispatch(toggleIsFetchingAC(false))
        })
}
