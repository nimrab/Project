import React from 'react';
import s from "../SignIn.module.scss";
import {AuthEmailField} from "../../../../common/AuthFields/AuthEmailField/AuthEmailField";
import {AuthPassField} from "../../../../common/AuthFields/AuthPassField/AuthPassField";
import {InputFieldType} from "../../SignUp/SignUp";


const SignInForm = (props: any) => {
    const {
        passwordInputMode,
        email,
        password,
    } = props

    return (
        <>
            <AuthEmailField
                email={email.value}
                text={'Email'}
                setEmail={email.valueChange}
                name={'email'}
                onBlur={email.isTouchedOn}
                onFocus={email.isTouchedOff}
            />
            {email.error && <div className={s.input_error}>{email.error}</div>}

            <AuthPassField
                type={passwordInputMode}
                password={password.value}
                isShowPassword={password.isShow}
                setPassword={password.valueChange}
                showPassword={password.isShowChange}
                text={'Password'}
                name={'password'}
                onBlur={password.isTouchedOn}
                onFocus={password.isTouchedOff}
            />
            {password.error && <div className={s.input_error}>{password.error}</div>}
        </>

    );
};

export default SignInForm;