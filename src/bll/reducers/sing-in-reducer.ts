import {Dispatch} from "redux";
import {authMeAC} from "./auth-reducer";
import {ActionType, authMeACType, DispatchType} from "../action-dispatchTypes";
import {authApi, SingInRequestType} from "../../dal/api/auth-api";
import {toggleIsFetchingAC} from "./app-reducer";

const initialState = {
    isSingIn: false
}
type InitialStateType = typeof initialState

export const singInReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-SING-IN':
            return {...state, isSingIn: action.value}
        default:
            return state
    }
}

export const singInAC = (value: boolean) => {
    return {
        type: 'SET-IS-SING-IN',
        value
    } as const
}


export const singInTC = (data: SingInRequestType) =>
    (dispatch: DispatchType) => {
        /*dispatch(toggleIsFetchingAC(true))*/
        authApi.singIn(data)
            .then((res) => {
                dispatch(singInAC(true))
                dispatch(authMeAC(res.data)) // need action for profile
            })
            .catch((e) => {
                const error = e.reponse
                    ? e.reponse.data.error
                    : (e.message + ',more details in the console')
            })
            // .finally(() =>
            //     // dispatch(toggleIsFetchingAC(false))
            // )

    }