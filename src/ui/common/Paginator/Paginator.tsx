import React, {useState} from "react";
import s from './Paginator.module.scss';
import SuperButton from "../c2-SuperButton/SuperButton";


type PaginatorPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    changeNumberPage: (p: number) => void
    portionSize: number
    disabled?: boolean
}

const Paginator = React.memo(({
                                  totalCount,
                                  pageSize,
                                  currentPage,
                                  changeNumberPage,
                                  portionSize, disabled
                              }: PaginatorPropsType) => {


    const pagesCount = Math.ceil(totalCount / pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState<number>(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className={s.paginatorContainer}>

            <SuperButton cancel={portionNumber < 2} disabled={portionNumber < 2 || disabled} className={s.button}
                         onClick={() => setPortionNumber(portionNumber - 1)}>prev</SuperButton>

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => <span key={p}
                                className={currentPage === p ? s.selectedPage : s.notselectpage}
                                onClick={() => changeNumberPage(p)}>{p}</span>
                )}

            <SuperButton cancel={portionCount == portionNumber} disabled={portionCount == portionNumber || disabled}
                         className={s.button}
                         onClick={() => setPortionNumber(portionNumber + 1)}>next</SuperButton>

        </div>
    )
})

export default Paginator