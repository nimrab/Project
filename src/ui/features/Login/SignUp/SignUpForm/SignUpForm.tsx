import React from 'react';
import s from "../SignUp.module.scss";
import {AuthEmailField} from "../../../../common/AuthFields/AuthEmailField/AuthEmailField";
import {AuthPassField} from "../../../../common/AuthFields/AuthPassField/AuthPassField";

const SignUpForm = (props: any) => {

    const {
        passwordInputMode,
        repeatPasswordInputMode,
        email,
        password,
        repeatPassword,
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

                <AuthPassField
                    type={repeatPasswordInputMode}
                    password={repeatPassword.value}
                    isShowPassword={repeatPassword.isShow}
                    setPassword={repeatPassword.valueChange}
                    showPassword={repeatPassword.isShowChange}
                    text={'Confirm password'}
                    name={'repeatPassword'}
                    onBlur={repeatPassword.isTouchedOn}
                    onFocus={repeatPassword.isTouchedOff}
                />
                {repeatPassword.error && <div className={s.input_error}>{repeatPassword.error}</div>}
           </>
    );
};

export default SignUpForm;