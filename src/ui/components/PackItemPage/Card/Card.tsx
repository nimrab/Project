import React from "react";

import s from '../TablePackItem/TablePackItem.module.scss'
import RefactorMyCard from "../TablePackItem/RefactorMyCard/refactorMyCard";

import {useAppSelector} from "../../../../bll/store";


type CardType = {
    id: string
    userId: string,
    question: string
    answer: string
    updated: string,
    create: string
    grade: number,
}

const Card = ({id, userId, question, answer, updated, create, grade}: CardType) => {

    const myUserID = useAppSelector<string>(state => state.auth.user._id)

    return (
        <div className={s.pack}>
            <p className={s.pack_block_question}>{question}</p>
            <p className={s.pack_block_answer}>{answer}</p>
            <p className={s.pack_block_update}>{updated}</p>
            <p className={s.pack_block_createdBy}>{create}</p>
            <p className={s.pack_block_grade}>{grade}</p>
            {userId === myUserID && <p className={s.pack_block_action}>
                <RefactorMyCard _id={id} newQuestion={question} newAnswer={answer}/></p>}
        </div>
    )
}
export default React.memo(Card)