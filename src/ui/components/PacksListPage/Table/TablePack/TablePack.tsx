import s from './TablePack.module.scss'
import SuperButton from "../../../../common/c2-SuperButton/SuperButton";
import RefactorMyPack from "./RefactorMyPack/RefactorMyPack";
import {useState} from "react";
import SuperInputText from "../../../../common/c1-SuperInputText/SuperInputText";
import {useInput} from "../../../../../hooks/useInput";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {savePackItemIdAC} from "../../../../../bll/reducers/packId-reducer";
import {getPackItemTC} from "../../../../../bll/reducers/packItem-reducer";
import DeletePack from "../../ModalsPage/DeletePack/DeletePack";
import UpdatePack from "../../ModalsPage/UpdatePack/UpdatePack";
import MyModal from "../../../../common/Modal/MyModal";
import {ModalType} from "../../../../../bll/reducers/modal-reducer";
import AddPacks from "../../ModalsPage/AddPacks/AddPacks";

type PackType = {
    id: string
    user_id: string
    name: string
    cardsCount: number
    updated: any
    user_name: string
    myUserID: string
}

const TablePack = ({
                       id,
                       user_id,
                       name,
                       cardsCount,
                       user_name,
                       updated,
                       myUserID,

                   }: PackType) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [update, setUpdate] = useState<boolean>(false)
    const newName = useInput(name, ['minLength'])


    const handleClickLearn = () => {
        console.log('learn btn')
        dispatch(savePackItemIdAC(id))
        navigate(`/learn-pack/${id}`)
    };

    const handleClickName = () => {
        dispatch(savePackItemIdAC(id))
        navigate(`/packItem/${id}`)
    }


    return (
        <div className={s.pack}>

            <p onClick={handleClickName} className={s.pack_block_name}>{newName.value}</p>
            <p className={s.pack_block_cards}>{cardsCount}</p>
            <p className={s.pack_block_update}>{updated}</p>
            <p className={s.pack_block_createdBy}>{user_name}</p>
            <div className={s.button_in_table}>
                {user_id === myUserID
                    && <RefactorMyPack id={id} name={name} setUpdate={setUpdate}/>}
                <SuperButton
                    className={user_id === myUserID ? s.button : `${s.button} ${s.button_learn}`}
                    onClick={handleClickLearn}
                             >learn</SuperButton>
            </div>
        </div>
    )
}
export default TablePack