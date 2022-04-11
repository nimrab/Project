import SuperButton from "../../../../common/c2-SuperButton/SuperButton";
import s from './DeletePack.module.scss'
import {useAppSelector} from "../../../../../bll/store";

type DeletePacksPropsType = {
    deletePack: (id: string) => void
}

const DeletePack = ({deletePack}: DeletePacksPropsType) => {
    const id = useAppSelector<string>(state => state.modal.id)
    const name = useAppSelector<string>(state => state.modal.name)


    const deletePackOnClick = () => {
        deletePack(id)
    }


    return (
        <div className={s.delete_packs_container}>
            <p>Do you really want to remove pack -<a className={s.packName}> {name}</a>?</p>
            <p>All cards will be excluded from this course.</p>
            <SuperButton onClick={deletePackOnClick} className={s.delete_button}>Delete</SuperButton>
        </div>
    )
}

export default DeletePack