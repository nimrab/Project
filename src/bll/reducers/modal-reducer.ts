import {ActionType} from "../action-dispatchTypes";

export type  ModalType = false | 'addPack' | 'deletePack' | 'updatePack'
export type modalReducerType = {
    activeModal: ModalType
    id: string
    name: string
    title: string
}

const initialState: modalReducerType = {
    activeModal: false,
    id:'0',
    name:'',
    title:''
}

export const modalReducer = (state: modalReducerType = initialState, action: ActionType): modalReducerType => {
    switch (action.type) {
        case "MODAL/SET-ACTIVE":
            return {...state, activeModal: action.activeModal}
        case "MODAL/DELETE-PACK":
            return {...state, activeModal: 'deletePack', id: action.id, name: action.name, title:'Delete pack'}
        case "MODAL/UPDATE-PACK":
            return {...state, activeModal: 'updatePack', id: action.id, name:action.name, title:'Update pack name'}
        case "MODAL/ADD-PACK":
            return {...state, activeModal: 'addPack',  title:'Add new pack'}
        default:
            return state
    }
}


export const setActiveModalAC = (activeModal: ModalType) => {
    return {
        type: "MODAL/SET-ACTIVE",
        activeModal
    } as const
}

export const deletePackModalAC = (id: string, name: string) => {
    return {
        type: "MODAL/DELETE-PACK",
        id, name
    } as const
}

export const updatePackModalAC = (id: string, name: string) => {
    return {
        type: "MODAL/UPDATE-PACK",
        id, name
    } as const
}
export const addPackModalAC = () => {
    return {
        type: "MODAL/ADD-PACK",
    } as const
}

