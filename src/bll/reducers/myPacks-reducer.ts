import {ActionType, DispatchType} from "../action-dispatchTypes";
import {packsApi} from "../../dal/api/packs-api";
import {getCardsTC, PackResponseType, setPackPreloaderAC} from "./packs-reducer";
import {Dispatch} from "redux";
import {log} from "util";
import {setActiveModalAC} from "./modal-reducer";


export type PacksResponseType = {
    cardPacks: PackResponseType []

}

const initialState = {
    cardPacks: [
        {
            _id: "5eb6cef840b7bf1cf0d8122d",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "no Name",
            cardsCount: 25,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
            user_name: 'vlad'
        },
    ],
}

export const myPacksReducer = (state: PacksResponseType = initialState, action: ActionType): PacksResponseType => {
    switch (action.type) {

        case "MY-PACKS/DELETE-PACK":
            return {...state, cardPacks: state.cardPacks.filter(c => c._id !== action.id && c)}
        case "MY-PACKS/ADD-PACK":
            return {...state, cardPacks: [...state.cardPacks, action.newPack]}
        case "MY-PACKS/UPDATE-PACK":
            return {...state, cardPacks: state.cardPacks.filter(c => action.id === c._id && action.updatePack)}
        default:
            return state
    }
}


export const deletePackAC = (id: string) => {
    return {
        type: "MY-PACKS/DELETE-PACK",
        id
    } as const
}

export const addPacksAC = (newPack: PackResponseType) => {
    return {
        type: "MY-PACKS/ADD-PACK",
        newPack
    } as const
}

export const updatePackAC = (id: string, updatePack: PackResponseType) => {
    return {
        type: "MY-PACKS/UPDATE-PACK",
        id, updatePack
    } as const
}


export const deletePackTC = (id: string) => async (dispatch: DispatchType) => {
    dispatch(setPackPreloaderAC(true))
    await packsApi.deletePack(id)
    dispatch(setActiveModalAC(false))
    dispatch(deletePackAC(id))
    dispatch(setPackPreloaderAC(false))
}

export const addNewPackTC = (name: string, privateBoolean: boolean) => async (dispatch: DispatchType) => {
    dispatch(setPackPreloaderAC(true))
    const res = await packsApi.addPack(name, privateBoolean)
    dispatch(setActiveModalAC(false))
    dispatch(addPacksAC(res.data.newCardsPack))
    dispatch(setPackPreloaderAC(false))
}


export const updatePackTC = (id: string, newName: string) => async (dispatch: DispatchType) => {
    dispatch(setPackPreloaderAC(true))
    const res = await packsApi.updatePack(id, newName)
    dispatch(setActiveModalAC(false))
    dispatch(updatePackAC(id, res.data.updatedCardsPack))
    dispatch(setPackPreloaderAC(false))
}
