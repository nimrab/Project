import React from "react";

import s from './TablePackItem.module.scss'

import {useAppSelector} from "../../../../bll/store";
import {PackItemResponseType} from "../../../../bll/reducers/packItem-reducer";
import {sortCardsType} from "../../../../bll/reducers/myCard-reducer";
import SortComponent from "./RefactorMyCard/sortComponent";
import {logicFunction} from "./RefactorMyCard/logicFunction";

type TablePackItemType = {
    sortCards: sortCardsType,
    setSortCards: (sortCards: sortCardsType) => void
}

const TablePackItem = ({sortCards, setSortCards}: TablePackItemType) => {

    const packItem = useAppSelector<PackItemResponseType>(state => state.packItem)
    const myUserID = useAppSelector<string>(state => state.auth.user._id)

    const questionSort = () => logicFunction(sortCards, setSortCards, '1question', '0question' )
    const answerSort = () => logicFunction(sortCards, setSortCards, '1answer', '0answer' )
    const updateSort = () => logicFunction(sortCards, setSortCards, '1updated', '0updated' )
    const gradeSort = () => logicFunction(sortCards, setSortCards,  '1grade', '0grade' )


    return (
        <div className={s.pack}>
            <SortComponent sortCards={sortCards} title='Question' handleOnClick={questionSort} down='0question'
                           app='1question' className={s.pack_block_question}/>
            <SortComponent sortCards={sortCards} title='Answer' handleOnClick={answerSort} down='0answer' app='1answer'
                           className={s.pack_block_answer}/>
            <SortComponent sortCards={sortCards} title='Last update' handleOnClick={updateSort} down='0updated'
                           app='1updated' className={`${s.pack_block_update} ${s.p_sort}`}/>
            <p className={s.pack_block_createdBy}>Create by</p>
            <SortComponent sortCards={sortCards} title='Grade' handleOnClick={gradeSort} down='0grade' app='1grade'
                           className={s.pack_block_grade}/>
            {packItem.packUserId === myUserID && <p className={s.pack_block_action}>Action</p>}
        </div>
    )
}
export default React.memo(TablePackItem)