import  {ChangeEvent, FocusEvent,  useState} from "react";
import {useFormValidDelete} from "./useFormValid(delete)";


export const useInputDelete = (initialValue: string, validations:any) => {

    const [value, setValue] = useState(initialValue)
    const [isDirty, setIsDirty] = useState(false)
    const valid =  useFormValidDelete(value, validations)

    /*original code*/
   /*
   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

     const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        setIsDirty(true)
    }
    */

    /*changed by dima*/
    const onChange = (e: string) => {
        setValue(e)
    }

    const onBlur = () => {
        setIsDirty(true)
    }


    return { value, onChange, onBlur, isDirty, ...valid }
}