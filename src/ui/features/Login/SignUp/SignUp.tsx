import React, {useEffect} from 'react'
import s from './SignUp.module.scss'
import {register, signUpAC} from "../../../../bll/reducers/sign-up-reducer";
import {useDispatch} from "react-redux";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../../../bll/store";
import Preloader from "../../../common/Preloader/Preloader";
import {maxLength, minLength} from "../login-constants";
import {useInput} from "../../../../hooks/useInput";
import SignUpForm from "./SignUpForm/SignUpForm";
import ErrorBar from "../../../common/ErrorBar/ErrorBar";
import SuperButton from "../../../common/c2-SuperButton/SuperButton";

export type InputFieldType = 'password' | 'text'

 const SignUp = () => {

    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isAuth)
    const isFetching = useAppSelector<boolean>(state => state.app.isFetching)
    const isRegistered = useAppSelector<boolean>(state => state.signUp.isRegistered)
    const responseError = useAppSelector<null | string>(state => state.app.error)
    const dispatch = useDispatch()
    const email = useInput('', ['isEmail', 'isEmpty'])
    const password = useInput('', ['minLength', 'maxLength', 'isEmpty'])
    const repeatPassword = useInput('', ['isEmpty'])
    const passwordInputMode: InputFieldType = !password.isShow ? 'password' : 'text'
    const repeatPasswordInputMode: InputFieldType = !repeatPassword.isShow ? 'password' : 'text'
    const formIsValid = !!(email.value && !email.error && !password.error && !repeatPassword.error)
    const registerBtnClass = `${s.registerBtn} ${!formIsValid ? s.btn_not_allowed : null}`

    useEffect(() => {
        if (password.value === repeatPassword.value) {
            repeatPassword.setError('')
        } else {
            repeatPassword.setError('Passwords are not exactly same')
        }
    }, [password.value, repeatPassword.value])

    const registerBtnClickHandler = () => {
        email.value && password.value && dispatch(register(email.value, password.value))
    }
    const cancelBtnHandler = () => {
        dispatch(signUpAC(true))
    }

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }
    if (isRegistered) {
        dispatch(signUpAC(true))
        return <Navigate to={'/signin'}/>
    }

    return (
        <section className={s.main_box}>
            {isFetching
                ? <Preloader/>
                :
                <section className={s.sign_up_box}>
                    <div className={s.sign_up_box_header}>
                        <div className={s.logo_text}>It-incubator</div>
                        <div className={s.sign_up_text}>Sign Up</div>
                    </div>

                    <div className={s.input_box_form}>
                        {responseError && <ErrorBar/>}
                        <SignUpForm
                            passwordInputMode={passwordInputMode}
                            repeatPasswordInputMode={repeatPasswordInputMode}
                            email={email}
                            password={password}
                            repeatPassword={repeatPassword}
                        />
                    </div>
                    <div className={s.box_buttons}>
                        <SuperButton
                            onClick={cancelBtnHandler}
                            className={s.cancelBtn}
                            cancel={true}
                        >
                            Cancel
                        </SuperButton>

                        <SuperButton
                            onClick={registerBtnClickHandler}
                            className={registerBtnClass}
                            disabled={!formIsValid}
                        >
                            Register
                        </SuperButton>
                    </div>
                </section>
            }
        </section>
    )
}
export default SignUp

