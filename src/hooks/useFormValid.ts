import {useEffect, useState} from "react";
import {maxLength, minLength} from "../ui/features/Login/login-constants";

export const useFormValid = (value: string | '', isTouched: boolean, validations: string[]) => {

    const [error, setError] = useState<string>('')

    useEffect(() => {

        for (const validation of validations) {
            switch (validation) {
                case 'minLength':
                    value.length < minLength
                    && isTouched
                    && setError(`Password should be from ${minLength} to ${maxLength} symbols`)
                    break
                case 'maxLength':
                    value.length > maxLength
                    && isTouched
                    && setError(`Password should be from ${minLength} to ${maxLength} symbols`)
                    break
                case 'isEmail': {
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    value
                    && isTouched
                    && !re.test(String(value).toLowerCase())
                    && setError('Email is not correct')
                    break
                }
                case 'isEmpty': {
                    !value
                    && isTouched
                    && setError('Field could not be empty')
                    break
                }
                default:
                    break
            }
        }
        if (!isTouched) setError('')
    }, [value, isTouched])

    return {error, setError}
}