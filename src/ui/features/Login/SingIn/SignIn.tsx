import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../../bll/store";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import {useCheckBox} from "../../../../hooks/useCheckBox";
import s from './SignIn.module.scss'
import Preloader from "../../../common/Preloader/Preloader";
import React, {useEffect} from "react";
import {InputFieldType} from "../SignUp/SignUp";
import {signUpAC} from "../../../../bll/reducers/sign-up-reducer";
import {useInput} from "../../../../hooks/useInput";
import SignInForm from "./SignInForm/SignInForm";
import ErrorBar from "../../../common/ErrorBar/ErrorBar";
import SuperButton from "../../../common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../../common/c3-SuperCheckbox/SuperCheckbox";
import {singInTC} from "../../../../bll/reducers/sing-in-reducer";
import {setPasswordIsCreatedAC} from "../../../../bll/reducers/auth-reducer";


const SignIn = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isAuth)
    const isFetching = useAppSelector<boolean>(state => state.app.isFetching)
    const responseError = useAppSelector<null | string>(state => state.app.error)
    const navigate = useNavigate()
    const email = useInput('', ['isEmail', 'isEmpty'])
    const password = useInput('', ['minLength', 'maxLength', 'isEmpty'])
    const rememberMe = useCheckBox(false)
    const singInData = {email: email.value, password: password.value, rememberMe: rememberMe.isChecked}
    const passwordInputMode: InputFieldType = !password.isShow ? 'password' : 'text'
    const formIsValid = !!(email.value && !email.error && !password.error)
    const signInBtnClass = `${s.sign_in_btn} ${!formIsValid ? s.btn_not_allowed : null}`

    useEffect(()=> {
        dispatch(setPasswordIsCreatedAC(false))
    },[])

    const signInBtnClickHandler = () => {
        dispatch(singInTC(singInData))
    }
    const signUpLinkHandler = () => {
        dispatch(signUpAC(false))
        navigate('/signup')
    }

    if (isLoggedIn) return <Navigate to='/profile'/>

    return (
        <section className={s.main_box}>
            {/*{isFetching*/}
            {/*    ? <Preloader/>*/}
            {/*    :*/}
                <section className={s.sign_in_box}>
                    <div className={s.sign_in_box_header}>
                        <div className={s.logo_text}>It-incubator</div>
                        <div className={s.sign_in_text}>Sign In</div>
                    </div>
                    <div className={s.input_box_form}>

                        {responseError && <ErrorBar/>}

                        <SignInForm
                            passwordInputMode={passwordInputMode}
                            email={email}
                            password={password}
                        />
                    </div>
                    <div className={s.forgot}>
                        <NavLink className={s.forgot_link} children={'Forgot Password'} to={'/forgotPass'}/>
                    </div>
                    <div className={s.sign_in_checkbox_box}>
                        <SuperCheckbox
                            checked={rememberMe.isChecked}
                            onChange={rememberMe.toggleChecked}
                        >
                            Remember me
                        </SuperCheckbox>
                    </div>
                    <div className={s.input_box_buttons}>
                        <SuperButton
                            onClick={signInBtnClickHandler}
                            className={signInBtnClass}
                            disabled={!formIsValid}
                        >
                            Login
                        </SuperButton>
                    </div>

                    <div className={s.account_text}>Don’t have an account?</div>
                    <div className={s.sign_up_text}>
                        <span onClick={signUpLinkHandler} className={s.sign_up_link}>Sign Up</span>
                    </div>
                </section>
            {/*}*/}
        </section>
    )
}

export default SignIn

