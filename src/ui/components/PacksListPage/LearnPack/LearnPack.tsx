import React, {ChangeEvent, useEffect, useState} from 'react';
import Preloader from "../../../common/Preloader/Preloader";
import {useAppSelector} from "../../../../bll/store";
import s from './LearnPack.module.scss';
import ErrorBar from "../../../common/ErrorBar/ErrorBar";
import SuperButton from "../../../common/c2-SuperButton/SuperButton";
import SuperRadio from "../../../common/c6-SuperRadio/SuperRadio";
import {PackItemType, setCardsGradeTC} from '../../../../bll/reducers/packItem-reducer';
import {useDispatch} from 'react-redux';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {getPackItemTC} from '../../../../bll/reducers/packItem-reducer';
import {PackResponseType} from '../../../../bll/reducers/packs-reducer';


const radioValues = ['Did not know', 'Forgot', 'A lot of thought', 'Сonfused', 'Knew the answer']

const LearnPack = () => {

    const dispatch = useDispatch()
    const isFetching = useAppSelector<boolean>(state => state.app.isFetching)
    const navigate = useNavigate()
    const responseError = useAppSelector<null | string>(state => state.app.error)
    const cardsArr = useAppSelector<Array<PackItemType>>(state => state.packItem.cards)
    const cardPacks = useAppSelector<Array<PackResponseType>>(state => state.packs.cardPacks)
    const params = useParams()
    const id = params.id ? params.id : ''
    const [isShow, setIsShow] = useState<boolean>(false)
    const [radioCurrentValue, setRadioCurrentValue] = useState<string>(radioValues[0])
    let [question, setQuestion] = useState<number>(0)

    const namePack = cardPacks.find(c => c._id === id && c)
    console.log(namePack ? namePack.name : '')

    useEffect(() => {
        dispatch(getPackItemTC(id))
    }, [])
    let grade = 1
    if (radioCurrentValue === 'Did not know') {
        grade = 1
    } else if (radioCurrentValue === 'Forgot') {
        grade = 2
    } else if (radioCurrentValue === 'A lot of thought') {
        grade = 3
    } else if (radioCurrentValue === 'Сonfused') {
        grade = 4
    } else if (radioCurrentValue === 'Knew the answer') {
        grade = 5
    }


    const cancelBtnHandler = () => {
        navigate(`/packsList`)
    }

    const showAnswerBtnClickHandler = () => {
        setIsShow(true)
    }

    const nextBtnClickHandler = () => {
        dispatch(setCardsGradeTC(grade, cardsArr[question]._id))
        setQuestion(question + 1)
        setIsShow(!isShow)
    }


    const radioOnChangeCallback = (value: string) => {
        setRadioCurrentValue(value)
    }

    if (question === cardsArr.length) {
        return <Navigate to={`/packsList`}/>
    }


    return (
        <section className={s.main_box}>
            {isFetching
                ? <Preloader/>
                :
                <section className={s.learn_box}>

                    <div className={s.error_box_form}>
                        {responseError && <ErrorBar/>}
                    </div>

                    <div className={s.learn_box_header}>
                        {namePack ? namePack.name : ''}
                    </div>

                    <div className={s.question_box}>
                        <span className={s.question_question}>Question: </span>
                        <span className={s.question_text}>{cardsArr[question].question}</span>
                    </div>

                    {isShow && <>
                        <div className={s.answer_box}>
                            <span className={s.question_question}>Answer: </span>
                            <span className={s.question_text}>{cardsArr[question].answer}</span>
                        </div>

                        <div className={s.rate_box}>
                            <h3 className={s.rate_header_text}>Rate yourself:</h3>
                            <div className={s.radio}>
                                <SuperRadio
                                    options={radioValues}
                                    onChangeOption={radioOnChangeCallback}
                                    value={radioCurrentValue}
                                />
                            </div>
                        </div>
                    </>
                    }

                    <div className={s.box_buttons}>
                        <SuperButton
                            onClick={cancelBtnHandler}
                            className={s.cancel_btn}
                            cancel={true}
                        >
                            Cancel
                        </SuperButton>

                        {!isShow &&
                            <SuperButton
                                onClick={showAnswerBtnClickHandler}
                                className={s.show_answer_btn}
                            >
                                Show answer
                            </SuperButton>
                        }

                        {isShow &&
                            <SuperButton
                                onClick={nextBtnClickHandler}
                                className={s.show_answer_btn}
                            >
                                Next
                            </SuperButton>
                        }
                    </div>
                </section>
            }
        </section>
    );
};

export default LearnPack;