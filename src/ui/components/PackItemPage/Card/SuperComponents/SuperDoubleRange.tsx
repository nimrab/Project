import React, {ChangeEvent, useState} from 'react'
import s from './SuperDoubleRange.module.css'


type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    onChange?: (value: number) => void
    value?: [number, number]
    className?: string
    min?: number
    max?: number
    step?: number
    // min, max, step, disable, ...
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChange,
        onChangeRange,
        value,
        min,
        max,
        step,
        className
        //onChangeRange, value,
        // min, max, step, disable, ...
    }
) => {
    // сделать самому, можно подключать библиотеки

    const [editOn, setEditOn] = useState<boolean>(false)


    let value1 = 0
    let value2 = 100


    if (value) {
        [value1, value2] = value
    }

    if (min) {
        value1 = value1 < min ? min : value1
    }

    if (max) {
        value2 = value2 > max ? max : value2
    }

    if (value1 > value2) {

        value1 = step ? value2 - step : value2
    }

    //если пришел "шаг" и значение не кратно "шагу", то выравниваем
    if (step) {
        if (value1 % step !== 0) {
            value1 = +Math.round(value1 / step) * step
        }
        if (value2 % step !== 0) {
            value2 = +Math.round(value2 / step) * step
        }
    }

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(+e) // сохраняем старую функциональность

        //проверяем какой ползунок тащим
        if (e.currentTarget.name === 'value1') {

            //проверяем, чтобы ползунки не нахлестывались друг на друга
            if (+e.currentTarget.value < value2) {
                onChangeRange && onChangeRange([+e.currentTarget.value, value2])
            }
        }
        //проверяем какой ползунок тащим
        if (e.currentTarget.name === 'value2') {

            //проверяем, чтобы ползунки не нахлестывались друг на друга
            if (+e.currentTarget.value > value1) {
                onChangeRange && onChangeRange([value1, +e.currentTarget.value])
            }
        }
    }

    const onBlurCallback = () => {
        setEditOn(false)
    }

    const onDoubleClickCallback = () => {
        setEditOn(true)
    }


    const finalRangeClassName = `${s.super_range} ${className ? className : ''}`


    return (
        <div className={s.doubleRange_box}>

            {editOn
                ? <input
                    type={'number'}
                    name={'value1'}
                    value={value1}
                    min={min ?? value1}
                    max={max ?? value2}
                    step={step ?? 1}
                    onChange={onChangeCallback}
                    onBlur={onBlurCallback}

                />
                : <span
                    className={s.value_num}
                    onDoubleClick={onDoubleClickCallback}
                >{value1}</span>
            }


            <form className={s.range_form}>
                <input
                    type={'range'}
                    name={'value1'}
                    value={value1}
                    step={step ?? 1}
                    onChange={onChangeCallback}
                    className={`${finalRangeClassName} ${s.range_second}`}
                />
                <input
                    type={'range'}
                    name={'value2'}
                    value={value2}
                    step={step ?? 1}
                    onChange={onChangeCallback}
                    className={finalRangeClassName}

                />
            </form>
            {editOn
                ? <input
                    type={'number'}
                    name={'value2'}
                    value={value2}
                    min={min ?? value1}
                    max={max ?? value2}
                    step={step ?? 1}
                    onChange={onChangeCallback}
                    onBlur={onBlurCallback}

                />
                : <span
                    className={s.value_num}
                    onDoubleClick={onDoubleClickCallback}
                >{value2}</span>
            }
        </div>
    )
}


export default SuperDoubleRange
