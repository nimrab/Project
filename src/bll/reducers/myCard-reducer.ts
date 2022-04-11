import {ActionType} from "../action-dispatchTypes";
import {getPackItemTC, PackItemType} from "./packItem-reducer";
import {packItemApi} from "../../dal/api/packItem-api";
import {AppRootStateType} from "../store";
import {ThunkAction} from "redux-thunk";
import {toggleIsFetchingAC} from "./app-reducer";
import {setActiveModalCardAC, updateCardModalAC} from "./modalCard-reducer";

export type sortCardsType =
    ''
    | '1question'
    | '0question'
    | '1answer'
    | '0answer'
    | '1updated'
    | '0updated'
    | '1grade'
    | '0grade'

export type CardsResponseType = {
    cards: PackItemType [],
    sortCard: string,
    error: string | undefined
}

const initialState = {
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
        }
    ],
    sortCard: '',
    error: ''
}

export const myCardReducer = (state: CardsResponseType = initialState, action: ActionType): CardsResponseType => {
    switch (action.type) {
        case "MY-CARDS/ADD-CARD":
            return {...state, cards: [...state.cards, action.newCard]}
        case "MY-CARDS/DELETE-CARD":
            return {...state, cards: state.cards.filter(c => c._id !== action.id && c)}
        case "MY-CARDS/UPDATE-CARD":
            return {...state, cards: state.cards.filter(c => action.id === c._id && action.updateCard)}
        case "MY-CARDS/SORT-CARD":
            return {...state, sortCard: action.sortCards}
        case "MY-CARDS/ERROR":
            return {...state, error:action.error}
        default:
            return state
    }
}

export const addNewCardAC = (newCard: PackItemType) => {
    return {
        type: "MY-CARDS/ADD-CARD",
        newCard
    } as const
}

export const deleteCardAC = (id: string) => {
    return {
        type: "MY-CARDS/DELETE-CARD",
        id
    } as const
}

export const updateCardAC = (id: string, updateCard: PackItemType) => {
    return {
        type: "MY-CARDS/UPDATE-CARD",
        id, updateCard
    } as const
}

export const sortCardAC = (sortCards: sortCardsType) => {
    return {
        type: "MY-CARDS/SORT-CARD",
        sortCards
    } as const
}

export const errorAC = (error: string) => {
    return {
        type: "MY-CARDS/ERROR",
        error
    } as const
}

export const addNewCardTC = (packItemId: string, question: string, answer: string):
    ThunkAction<void, AppRootStateType, unknown, ActionType> =>
    (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        packItemApi.postCard(packItemId, question, answer)
            .then((res) => {
                console.log(res)
                dispatch(getPackItemTC(packItemId))
                dispatch(setActiveModalCardAC(false))
            })
            .catch((error) => {
                dispatch(errorAC(error.error))
            })
            .finally(() => {
                dispatch(toggleIsFetchingAC(false))
            })
    }

export const deleteCardTC = (cardId: string, packItemId: string):
    ThunkAction<void, AppRootStateType, unknown, ActionType> =>
    (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        packItemApi.deleteCard(cardId)
            .then(() => {
                dispatch(getPackItemTC(packItemId))
                dispatch(setActiveModalCardAC(false))
            })
            .catch(error => {

            })
            .finally(() => {
                dispatch(toggleIsFetchingAC(false))
            })
    }

export const updateCardTC = (cardId: string, newQuestion: string, newAnswer: string, packItemId: string):
    ThunkAction<void, AppRootStateType, unknown, ActionType> =>
    (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        packItemApi.updateCard(cardId, newQuestion, newAnswer)
            .then(() => {
                dispatch(getPackItemTC(packItemId))
                dispatch(updateCardModalAC(cardId, newQuestion, newAnswer, packItemId))
                dispatch(setActiveModalCardAC(false))
            })
            .catch((error) => {

            })
            .finally(() => {
                dispatch(toggleIsFetchingAC(false))
            })
    }
