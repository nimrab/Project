import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './SuperCheckbox.module.scss'
import check from '../../../assets/image/check.svg'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        className, spanClassName,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        // сделайте так чтоб работал onChange и onChangeChecked
        if (onChangeChecked) {
            onChangeChecked(e.currentTarget.checked)
        } else if (onChange) {
            onChange(e)
        }
    }

    const finalInputClassName = `${className && className} ${s.checkbox} `

    return (
        <label className={s.checkboxLabel}>
            <input
                type={'checkbox'}
                onChange={onChangeCallback}
                id="checkbox-id"
                className={finalInputClassName}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
            />
            {children && <span className={s.spanClassName}>{children}</span>}
        </label> // благодаря label нажатие на спан передастся в инпут
    )
}

export default SuperCheckbox
