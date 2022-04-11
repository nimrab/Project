import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {authReducer} from "./reducers/auth-reducer";
import {appReducer} from "./reducers/app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {singUpReducer} from "./reducers/sign-up-reducer";
import {packsReducer} from "./reducers/packs-reducer";
import {singInReducer} from "./reducers/sing-in-reducer";
import {myPacksReducer} from "./reducers/myPacks-reducer";

import {packItemReducer} from "./reducers/packItem-reducer";
import {packIdReducer} from "./reducers/packId-reducer";
import {myCardReducer} from "./reducers/myCard-reducer";
import {modalReducer} from "./reducers/modal-reducer";
import {modalCardReducer} from "./reducers/modalCard-reducer";

const reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    singIn: singInReducer,
    signUp: singUpReducer,
    packItem: packItemReducer,
    myCard: myCardReducer,
    packItemId: packIdReducer,
    packs: packsReducer,
    myPacks: myPacksReducer,
    modal: modalReducer,
    modalCard: modalCardReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof reducers>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;