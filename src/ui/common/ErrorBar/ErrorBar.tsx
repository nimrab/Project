import React from 'react';
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../bll/store";
import {setAppErrorAC} from "../../../bll/reducers/app-reducer";
import s from './ErrorBar.module.scss'

const ErrorBar = () => {

    const dispatch = useDispatch()
    const responseError = useAppSelector<string | null>(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
    };

    return (
        <div className={s.error_bar}>
            {responseError}
        </div>
    )
}

export default ErrorBar;