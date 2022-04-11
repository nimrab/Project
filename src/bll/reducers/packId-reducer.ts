import {ActionType} from "../action-dispatchTypes";


export type InitialStateType = {
    packItemId:string
}

const initialState = {
   packItemId:''
}


export const packIdReducer = (state:InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "PACK-ITEM/SAVE-ID":
            return {...state, packItemId: action.packItemId}
        default:
            return state
    }
}

export const savePackItemIdAC = (packItemId:string) => {
    return {
        type: "PACK-ITEM/SAVE-ID",
        packItemId
    } as const
}

