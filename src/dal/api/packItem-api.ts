import {instance} from "./auth-api";
import {PackItemResponseType, PackItemType} from "../../bll/reducers/packItem-reducer";
import {AxiosResponse} from "axios";


export const packItemApi = {
    getCards(cardsPack_id: string,
             page?: number,
             pageCount?: number,
             min?: number,
             max?: number,
             cardAnswer?: string,
             cardQuestion?: string,
             sortCards?: string,) {
        return instance.get<PackItemResponseType, AxiosResponse<PackItemResponseType>, PackItemRequestType>(`/cards/card`, {
            params: {
                cardAnswer,
                cardQuestion,
                cardsPack_id: cardsPack_id,
                min,
                max,
                sortCards,
                page,
                pageCount
            }
        })
    },
    postCard(cardsPack_id: string, question?: string, answer?: string, grade?: number, shots?: number, answerImg?: string, questionImg?: string, questionVideo?: string, answerVideo?: string) {
        return instance.post<PackItemType, AxiosResponse<PackItemType>, PostAndPutCardRequestType>(`/cards/card?id=${cardsPack_id}`, {
            card: {
                cardsPack_id,
                question,
                answer,
                grade,
                shots,
                answerImg,
                questionImg,
                questionVideo,
                answerVideo
            }
        })
    },
    deleteCard(id: string) {
        return instance.delete(`/cards/card?id=${id}`)
    },
    updateCard(id: string, newQuestion: string, newAnswer: string) {
        return instance.put('/cards/card', {card: {_id: id, question: newQuestion, answer: newAnswer}})
    },
    cardsGrade(grade:number, card_id:string){
        return instance.put('/cards/grade', {grade, card_id})
    }
}


export type PackItemRequestType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type PostAndPutCardRequestType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
    }
}