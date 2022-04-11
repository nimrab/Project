import {Dispatch} from "redux";
import {ActionType} from "../bll/action-dispatchTypes";
import {setAppErrorAC} from "../bll/reducers/app-reducer";


export const handleServerAppError = (dispatch: Dispatch<ActionType>, err: any) => {
    if (err.response.data.error) {
        dispatch(setAppErrorAC(err.response.data.error))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
}
