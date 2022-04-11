import {Dispatch} from "redux";
import {setAppErrorAC, setAppInitializeAC, toggleIsFetchingAC} from "./reducers/app-reducer";
import {
    authMeAC,
    changeProfileAC,
    setPasswordIsCreatedAC,
    setSentPassAC,
    setTokenIsSentAC,
    signOutAC
} from "./reducers/auth-reducer";
import {signUpAC} from "./reducers/sign-up-reducer";
import {
    changeNumberPageAC,
    getPacksAC,
    searchPackAC,
    setMaxMinNumberCardsAC, setPackPreloaderAC,
    setPageCountAC, setWhosePackAC
} from "./reducers/packs-reducer";
import {addPacksAC, deletePackAC, updatePackAC} from "./reducers/myPacks-reducer";
import {
    changeNumberPageCardsAC,
    getPackItemAC,
    setCardsCountAC,
    setCardsGradeAC,
    setMaxMinGradeAC
} from "./reducers/packItem-reducer";
import {savePackItemIdAC} from "./reducers/packId-reducer";
import {addNewCardAC, deleteCardAC, errorAC, sortCardAC, updateCardAC} from "./reducers/myCard-reducer";
import {addPackModalAC, deletePackModalAC, setActiveModalAC, updatePackModalAC} from "./reducers/modal-reducer";
import {
    addCardModalAC,
    deleteCardModalAC,
    setActiveModalCardAC,
    updateCardModalAC
} from "./reducers/modalCard-reducer";
import {singInAC} from "./reducers/sing-in-reducer";


export type ActionType =
    ToggleIsFetchingACType
    | authMeACType
    | signOutACType
    | changeProfileACType
    | setAppInitializeAT
    | signUpAT
    | getPacksAT
    | changeNumberPageAT
    | setMaxMinNumberCardsAT
    | setPageCountAT
    | setAppErrorAT
    | setTokenIsSentAT
    | deletePackAT
    | addPacksAT
    | updatePackAT
    | searchPackAT
    | setPassIsSentAT
    | setPasswordIsCreatedAT

    | GetPackItemAT
    | SetMinMaxGradeAT
    | SetCardsCountAT
    | ChangeNumberPageCardsAT
    | SavePackItemIdAT
    | setWhosePackAT
    | setPackPreloaderAT
    | setCardsGradeAT


    | AddNewCardAT
    | DeleteCardAT
    | UpdateCardAT
    | SortCardAT

    | setActiveModalAT
    | deletePackModalAT
    | updatePackModalAT
    | addPackModalAT
    | ErrorAT

    | SetActiveModalCardAT
    | AddPackModalCardAT
    | DeletePackModalCardAT
    | UpdatePackModalCardAT

    | SingInAT

export type ToggleIsFetchingACType = ReturnType<typeof toggleIsFetchingAC>;
export type authMeACType = ReturnType<typeof authMeAC>;
export type signOutACType = ReturnType<typeof signOutAC>;
export type changeProfileACType = ReturnType<typeof changeProfileAC>;
export type setAppInitializeAT = ReturnType<typeof setAppInitializeAC>

export type signUpAT = ReturnType<typeof signUpAC>
export type setAppErrorAT = ReturnType<typeof setAppErrorAC>
export type getPacksAT = ReturnType<typeof getPacksAC>
export type changeNumberPageAT = ReturnType<typeof changeNumberPageAC>
export type setMaxMinNumberCardsAT = ReturnType<typeof setMaxMinNumberCardsAC>
export type setPageCountAT = ReturnType<typeof setPageCountAC>
export type setTokenIsSentAT = ReturnType<typeof setTokenIsSentAC>
export type setPassIsSentAT = ReturnType<typeof setSentPassAC>
export type setPasswordIsCreatedAT = ReturnType<typeof setPasswordIsCreatedAC>


export type deletePackAT = ReturnType<typeof deletePackAC>
export type addPacksAT = ReturnType<typeof addPacksAC>
export type updatePackAT = ReturnType<typeof updatePackAC>
export type searchPackAT = ReturnType<typeof searchPackAC>

export type GetPackItemAT = ReturnType<typeof getPackItemAC>
export type SetMinMaxGradeAT = ReturnType<typeof setMaxMinGradeAC>
export type SetCardsCountAT = ReturnType<typeof setCardsCountAC>
export type ChangeNumberPageCardsAT = ReturnType<typeof changeNumberPageCardsAC>
export type SavePackItemIdAT = ReturnType<typeof savePackItemIdAC>
export type setWhosePackAT = ReturnType<typeof setWhosePackAC>
export type setPackPreloaderAT = ReturnType<typeof setPackPreloaderAC>
export type setCardsGradeAT = ReturnType<typeof setCardsGradeAC>


export type AddNewCardAT = ReturnType<typeof addNewCardAC>
export type DeleteCardAT = ReturnType<typeof deleteCardAC>
export type UpdateCardAT = ReturnType<typeof updateCardAC>
export type SortCardAT = ReturnType<typeof sortCardAC>


export type setActiveModalAT = ReturnType<typeof setActiveModalAC>
export type deletePackModalAT = ReturnType<typeof deletePackModalAC>
export type updatePackModalAT = ReturnType<typeof updatePackModalAC>
export type addPackModalAT = ReturnType<typeof addPackModalAC>
export type ErrorAT = ReturnType<typeof errorAC>

export type SetActiveModalCardAT = ReturnType<typeof setActiveModalCardAC>
export type AddPackModalCardAT = ReturnType<typeof addCardModalAC>
export type DeletePackModalCardAT = ReturnType<typeof deleteCardModalAC>
export type UpdatePackModalCardAT = ReturnType<typeof updateCardModalAC>

export type SingInAT = ReturnType<typeof singInAC>

export type DispatchType = Dispatch<ActionType>

