import {useState} from "react";
import {useFormValid} from "./useFormValid";

export const useInput = (initValue: string, validations: string[]) => {
    const [value, setValue] = useState<string | ''>(initValue)
    const [isShow, setIsShow] = useState<boolean>(false)
    const [isTouched, setIsTouched] = useState<boolean>(false)
    const valid = useFormValid(value, isTouched, validations)

    const valueChange = (value: string) => {
        setValue(value)
    }
    const isShowChange = () => {
        setIsShow(!isShow)
    }
    const isTouchedOn = () => {
        setIsTouched(true)
    }
    const isTouchedOff = () => {
        setIsTouched(false)
    }

    return {value, isShow, isTouched, valueChange, isShowChange, isTouchedOn, isTouchedOff, ...valid}
}
