import {AppRootStateType} from "../../../../bll/store";

export const selectorSingIn = (state: AppRootStateType): boolean => state.singIn.isSingIn
export const selectorisFetching = (state: AppRootStateType): boolean => state.app.isFetching
