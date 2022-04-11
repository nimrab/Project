import {useState} from "react";

export const useCheckBox = (initialValue: boolean) => {

    const [isChecked, setIsChecked] = useState(initialValue)

    const toggleChecked = () => {
        setIsChecked(!isChecked)
    }
    return {isChecked, toggleChecked}
}