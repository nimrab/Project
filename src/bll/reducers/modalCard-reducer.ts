import {ActionType} from "../action-dispatchTypes";
import {ModalType} from "./modal-reducer";

export type modalCardReducerType = {
    activeModalCard: ModalType
    packId:string,
    cardId: string,
    question: string
    answer: string,
    title:string
}

const initialState: modalCardReducerType = {
    activeModalCard: false,
    packId:'',
    cardId: '',
    question:'',
    answer:'',
    title: ''
}

export const modalCardReducer = (state: modalCardReducerType = initialState, action: ActionType): modalCardReducerType => {
    switch (action.type) {
        case  "MODAL-CARD/SET-ACTIVE":
            return {...state, activeModalCard: action.activeModalCard}
        case "MODAL-CARD/ADD-CARD":
            return {...state, activeModalCard: 'addPack', question: action.newQuestion, answer:action.newAnswer,  title:'Add new pack'}
        case "MODAL-CARD/DELETE-CARD":
             return {...state, activeModalCard: 'deletePack', packId: action.packId, cardId: action.cardId, title:'Delete card'}
         case "MODAL-CARD/UPDATE-CARD":
           return {...state, activeModalCard: 'updatePack', packId: action.packId, question:action.newQuestion,answer:action.newAnswer,cardId:action.cardId, title:'Update card'}

        default:
            return state
    }
}


export const setActiveModalCardAC = (activeModalCard: ModalType) => {
    return {
        type: "MODAL-CARD/SET-ACTIVE",
        activeModalCard
    } as const
}

export const addCardModalAC = (packId: string, newQuestion:string, newAnswer:string,) => {
    return {
        type: "MODAL-CARD/ADD-CARD",
        packId, newQuestion, newAnswer
    } as const
}

export const deleteCardModalAC = (packId: string, cardId: string) => {
    return {
        type: "MODAL-CARD/DELETE-CARD",
        packId, cardId
    } as const
}

export const updateCardModalAC = (packId: string, newQuestion:string, newAnswer:string,  cardId: string) => {
    return {
        type: "MODAL-CARD/UPDATE-CARD",
        packId, newQuestion,newAnswer, cardId
    } as const
}

