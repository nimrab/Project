import AddCard from "./AddCard/AddCard";
import UpdateCard from "./UpdateCard/UpdateCard";
import DeleteCard from "./DeleteCard/DeleteCard";
import {useAppSelector} from "../../../../bll/store";
import {ModalType} from "../../../../bll/reducers/modal-reducer";
import MyModalCard from "../../../common/ModalCard/MyModalCard";


type MyModalPageCardPropsType = {
    addNewCard: (question: string, answer: string) => void
    deleteCard: (id: string) => void
    updateCard: (cardId:string, newQuestion: string, newAnswer: string) => void
}

const MyModalPageCard = ({addNewCard, deleteCard, updateCard}: MyModalPageCardPropsType) => {

    const activeModalCard = useAppSelector<ModalType>(state => state.modalCard.activeModalCard)
    const title = useAppSelector<string>(state => state.modalCard.title)

    return (
        <MyModalCard activeModal={activeModalCard} title={title}>
            {activeModalCard === 'addPack' && <AddCard addNewCard={addNewCard}/>}
            {activeModalCard === 'deletePack' && <DeleteCard deleteCard={deleteCard}/>}
            {activeModalCard === 'updatePack' && <UpdateCard updateCard={updateCard}/>}
        </MyModalCard>
    )
}

export default MyModalPageCard