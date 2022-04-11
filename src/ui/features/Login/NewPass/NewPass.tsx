import React from 'react';
import s from './NewPass.module.scss'
import {AuthPassField} from "../../../common/AuthFields/AuthPassField/AuthPassField";
import {InputFieldType} from "../SignUp/SignUp";
import SuperButton from "../../../common/c2-SuperButton/SuperButton";
import {useAppSelector} from "../../../../bll/store";
import {useDispatch} from "react-redux";
import {useInput} from "../../../../hooks/useInput";
import {Navigate, useParams} from "react-router-dom";
import Preloader from "../../../common/Preloader/Preloader";
import ErrorBar from "../../../common/ErrorBar/ErrorBar";
import {setNewPass} from "../../../../bll/reducers/auth-reducer";


export const NewPass = () => {

        const isLoggedIn = useAppSelector<boolean>(state => state.auth.isAuth)
        const passwordIsCreated = useAppSelector<boolean>(state => state.auth.passwordIsCreated)
        const isFetching = useAppSelector<boolean>(state => state.app.isFetching)
        const responseError = useAppSelector<null | string>(state => state.app.error)
        const dispatch = useDispatch()
        const params = useParams()
        const password = useInput('', ['minLength', 'maxLength', 'isEmpty'])
        const passwordInputMode: InputFieldType = !password.isShow ? 'password' : 'text'
        const formIsValid = !!(password.value && !password.error)
        const createPassBtnClass = `${s.createPassBtn} ${!formIsValid ? s.btn_not_allowed : null}`
        const token = params.token


        const handleCreatePassBtn = () => {
            dispatch(setNewPass(password.value, token))
        }

        if (isLoggedIn) {
            return <Navigate to={'/profile'}/>
        }

        if (!token) {
            return <Navigate to={'/signin'}/>
        }

        if (passwordIsCreated) {
            return <Navigate to={'/signin'}/>
        }

        return (
            <section className={s.main_box}>
                {isFetching
                    ? <Preloader/>
                    :
                    <section className={s.create_pass_box}>

                        <div>
                            <div className={s.logo_text}>It-incubator</div>
                            <div className={s.create_pass_text}>Create new password</div>
                        </div>
                        <div className={s.input_box_form}>
                            {responseError && <ErrorBar/>}
                            <AuthPassField
                                type={passwordInputMode}
                                password={password.value}
                                isShowPassword={password.isShow}
                                setPassword={password.valueChange}
                                showPassword={password.isShowChange}
                                text={''}
                                name={'password'}
                                onBlur={password.isTouchedOn}
                                onFocus={password.isTouchedOff}
                            />
                            {password.error && <div className={s.input_error}>{password.error}</div>}
                        </div>
                        <div className={s.create_instructions}>
                            <span className={createPassBtnClass}>Create new password and we will send you further instructions to email</span>
                        </div>
                        <div className={s.input_box_buttons}>
                            <SuperButton
                                onClick={handleCreatePassBtn}
                                className={createPassBtnClass}
                                disabled={!formIsValid}
                            >
                                Create new password
                            </SuperButton>
                        </div>
                    </section>
                }
            </section>
        );
    }
;

