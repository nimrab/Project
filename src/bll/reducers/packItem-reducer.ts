import {ActionType} from "../action-dispatchTypes";
import {Dispatch} from "redux";
import {packItemApi} from "../../dal/api/packItem-api";


export type PackItemType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

export type PackItemResponseType = {
    cards: PackItemType []
    cardsTotalCount: number
    maxCardGrade: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

const initialState: PackItemResponseType = {
    cards: [
        {
            answer: "no answer",
            question: "no question",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            grade: 4.987525071790364,
            shots: 1,
            user_id: "142151531535151",
            created: "2020-05-13T11:05:44.867Z",
            updated: "2020-05-13T11:05:44.867Z",
            _id: "5ebbd48876810f1ad0e7ece3",
        },
    ],
    cardsTotalCount: 3,
    maxCardGrade: 6,
    maxGrade: 6,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: "5eecf82a3ed8f700042f1186",
}


export const packItemReducer = (state: PackItemResponseType = initialState, action: ActionType): PackItemResponseType => {
    switch (action.type) {
        case "PACK-ITEM/GET-CARD":

            return {
                ...state,
                cards: action.cards,
                cardsTotalCount: action.cardsTotalCount,
                maxCardGrade: action.maxGrade,
                packUserId: action.packUserId
            }
        case "PACK-ITEM/SET-MAX-MIN-GRADE":
            return {...state, maxGrade: action.max, minGrade: action.min}
        case "PACK-ITEM/SET-CARDS-COUNT":
            return {...state, pageCount: action.cardsCount}
        case  "PACK-ITEM/CHANGE-NUMBER-CARDS":
            return {...state, page: action.numberPage}
        case  "PACK-ITEM/SET-CARDS-GRADE":
            return {
                ...state, cards: state.cards.filter(c => c._id === action.card_id
                    ? {...c, grade: action.grade}
                    : c)
            }
        default:
            return state
    }
}

export const getPackItemAC = (cards: PackItemType[], cardsTotalCount: number, maxGrade: number, packUserId: string) => {
    return {
        type: "PACK-ITEM/GET-CARD",
        cards, cardsTotalCount, maxGrade, packUserId

    } as const
}

export const setMaxMinGradeAC = (min: number, max: number) => {
    return {
        type: "PACK-ITEM/SET-MAX-MIN-GRADE",
        max, min
    } as const
}

export const setCardsCountAC = (cardsCount: number) => {
    return {
        type: "PACK-ITEM/SET-CARDS-COUNT",
        cardsCount
    } as const
}

export const changeNumberPageCardsAC = (numberPage: number) => {
    return {
        type: "PACK-ITEM/CHANGE-NUMBER-CARDS",
        numberPage
    } as const
}

export const setCardsGradeAC = (grade: number, card_id: string) => {
    return {
        type: "PACK-ITEM/SET-CARDS-GRADE",
        grade, card_id
    } as const
}


export const getPackItemTC = (cardsPack_id: string,
                              page?: number,
                              pageCount?: number,
                              min?: number,
                              max?: number,
                              cardAnswer?: string,
                              cardQuestion?: string,
                              sortCards?: string) => (dispatch: Dispatch) => {
    // dispatch(toggleIsFetchingAC(true))
    packItemApi.getCards(cardsPack_id, page, pageCount, min, max, cardAnswer, cardQuestion, sortCards)
        .then(res => {
            dispatch(getPackItemAC(res.data.cards, res.data.cardsTotalCount, res.data.maxGrade, res.data.packUserId))
        })
        .catch(() => {

        })
    // .finally(() => {
    //     dispatch(toggleIsFetchingAC(false))
    // })
}

export const setCardsGradeTC = (grade: number, card_id: string) => async (dispatch: Dispatch) => {
    // dispatch(toggleIsFetchingAC(true))
    packItemApi.cardsGrade(grade, card_id)
        .then(res => {
            dispatch(setCardsGradeAC(grade, card_id))

        })
        .catch(() => {

        })
    // .finally(() => {
    //     dispatch(toggleIsFetchingAC(false))
    // })
}

