import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        // onChange, onChangeOption

        onChangeOption && onChangeOption(e.currentTarget.value)

    }


    const mappedOptions: any[] = options ? options.map((o, i) => (
        <div  key={name + '-' + i}>
        <label>
            <input
                name={'radioBtn' + i}
                type={'radio'}
                checked={o === value}
                value={o}
                onChange={onChangeCallback}
                // name, checked, value, onChange
            />
            {o}
        </label>
        </div>
    )) : []

    return (
        <>
            {mappedOptions}
        </>
    )
}

export default SuperRadio
