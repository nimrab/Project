import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.scss'


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    cancel?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        cancel, className,
        ...restProps
    }
) => {

    const finalClassName = `${s.default} ${cancel && s.cancel} ${className}`

    return (

        <button
            onClick={restProps.onClick}
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        >
        </button>

    )
}

export default SuperButton
