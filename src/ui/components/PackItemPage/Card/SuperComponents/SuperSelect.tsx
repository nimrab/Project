import React, { SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent } from 'react'
import s from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const mappedOptions: any[] = options ? options.map((o, i) => ( // map options with key
        <option key={o + '-' + i} className={s.option} value={o}>{o}</option>
    )) : [] // map options with key


    function onChangeCallback(e: ChangeEvent<HTMLSelectElement>) {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
        // onChange, onChangeOption
    }

    return (
        <select onChange={onChangeCallback} className={s.select} {...restProps}>
            {mappedOptions}
        </select>
    )
}

export default SuperSelect
