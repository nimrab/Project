import React from 'react';
import s from './AuthPassField.module.scss'
import SuperInputText from "../../c1-SuperInputText/SuperInputText";
import eye from './../../../../assets/icons/eyeicon.png'

type AuthPassPropsType = {
    type: string
    password?: string
    isShowPassword?: boolean
    setPassword: (e: string) => void
    showPassword: () => void
    text: string
    placeholder?: string
    onBlur?: () => void
    onFocus?: () => void
    name?: string
}

export const AuthPassField: React.FC<AuthPassPropsType> = (props) => {

    const {type, password, isShowPassword, setPassword, showPassword, text, placeholder, onBlur, name, onFocus} = props

    return (
        <div className={s.input_box}>
            <div className={s.input_name}>{text}</div>
            <SuperInputText
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={(e) => setPassword(e.currentTarget.value)}
                value={password}
                onBlur={onBlur}
                onFocus={onFocus}
            />
            <img src={eye}
                 alt={'show password'}
                 className={`${s.eye}  ${isShowPassword && s.eye_opacity}`}
                 onClick={showPassword}
            />
        </div>
    );
};

