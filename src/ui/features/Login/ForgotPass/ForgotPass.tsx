import React from "react";
import s from './ForgotPass.module.scss'
import SuperButton from "../../../common/c2-SuperButton/SuperButton";
import {AuthEmailField} from "../../../common/AuthFields/AuthEmailField/AuthEmailField";
import {Navigate, useNavigate} from "react-router-dom";
import {useInput} from "../../../../hooks/useInput";
import ErrorBar from "../../../common/ErrorBar/ErrorBar";
import {useAppSelector} from "../../../../bll/store";
import {useDispatch} from "react-redux";
import Preloader from "../../../common/Preloader/Preloader";
import {sendTokenTC, setTokenIsSentAC} from "../../../../bll/reducers/auth-reducer";


const ForgotPass = () => {

    const responseError = useAppSelector<null | string>(state => state.app.error)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isAuth)
    const isFetching = useAppSelector<boolean>(state => state.app.isFetching)
    const sentPassword = useAppSelector<string>(state => state.auth.sentPassword)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const email = useInput('', ['isEmail', 'isEmpty'])
    const formIsValid = email.value && !email.error
    const sendInstructionsBtnClass = `${s.btn_send_instructions} ${!formIsValid && s.btn_not_allowed}`

    const handleForgotBtn = () => {
        dispatch(sendTokenTC(email.value))
    }
    const handleForgotLink = () => {
        navigate('/signin')
    }

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }
    if (sentPassword) {
        dispatch(setTokenIsSentAC(false))
        return <Navigate to={'/checkEmail'}/>
    }

    return (
        <section className={s.main_box}>

            {isFetching
                ? <Preloader/>
                : <section className={s.forgot_box}>
                    <div>
                        <div className={s.logo_text}>It-incubator</div>
                        <div className={s.forgot_text}>Forgot your password?</div>
                    </div>
                    {responseError && <ErrorBar/>}
                    <div className={s.input_box_form}>
                        <AuthEmailField
                            email={email.value}
                            name={'email'}
                            text={''}
                            setEmail={email.valueChange}
                            placeholder={'Email'}
                            onBlur={email.isTouchedOn}
                            onFocus={email.isTouchedOff}
                        />
                        {email.error && <div className={s.input_error}>{email.error}</div>}
                        <div className={s.email_instructions}>
                            <span className={s.email_instructions_text}>Enter your email address and we will send you further instructions </span>
                        </div>
                    </div>
                    <div className={s.input_box_buttons}>
                        <SuperButton
                            onClick={handleForgotBtn}
                            className={sendInstructionsBtnClass}
                            disabled={!formIsValid}
                        >
                            Send Instructions
                        </SuperButton>
                    </div>
                    <div className={s.email_remember}>
                        <span className={s.email_instructions_text}>Did you remember your password?</span>
                    </div>
                    <div className={s.try_login_text}>
                        <span onClick={handleForgotLink} className={s.try_login_link}>Try logging in</span>
                    </div>
                </section>
            }
        </section>
    )
}

export default ForgotPass
