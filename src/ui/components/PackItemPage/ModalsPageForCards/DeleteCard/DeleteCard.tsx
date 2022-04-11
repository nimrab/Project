import SuperButton from "../../../../common/c2-SuperButton/SuperButton";
import s from './DeleteCard.module.scss'
import {useAppSelector} from "../../../../../bll/store";

type DeletePacksPropsType = { deleteCard: (id: string) => void }

const DeleteCard = ({deleteCard}: DeletePacksPropsType) => {

    const id = useAppSelector<string>(state => state.modalCard.cardId)

    const deleteCardOnClick = () => {
        deleteCard(id)
    }


    return (
        <div className={s.delete_packs_container}>
            <p>Do you really want to remove card ?</p>
            <p>All data will be excluded from this course.</p>
            <SuperButton onClick={deleteCardOnClick} className={s.delete_button}>Delete</SuperButton>
        </div>
    )
}

export default DeleteCard