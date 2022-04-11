import SuperButton from "../../../../../common/c2-SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import s from '../TablePack.module.scss'
import {deletePackModalAC, updatePackModalAC} from "../../../../../../bll/reducers/modal-reducer";

type RefactorMyPackPropsType = {
    id: string
    name: string
    setUpdate: (bool: boolean) => void
}

const RefactorMyPack = (props: RefactorMyPackPropsType) => {

    const dispatch = useDispatch()

    const deletePackModal = () => {
        dispatch(deletePackModalAC(props.id, props.name))
    }
    const updatePackModal = () => {
        dispatch(updatePackModalAC(props.id, props.name))
    }

    return (
        <div className={s.block_button}>
            <SuperButton className={` ${s.button} ${s.delete}`} onClick={deletePackModal}>Delete</SuperButton>
            <SuperButton className={s.button} onClick={updatePackModal}>Edit</SuperButton>

        </div>
    )
}

export default RefactorMyPack