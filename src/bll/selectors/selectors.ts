import {AppRootStateType} from "../store";

export const selectorIsInitialized = (state:AppRootStateType) => state.app.isInitialized
export const selectorFetching = (state:AppRootStateType):boolean => state.app.isFetching
export const selectorIsAuth = (state:AppRootStateType) => state.auth.isAuth