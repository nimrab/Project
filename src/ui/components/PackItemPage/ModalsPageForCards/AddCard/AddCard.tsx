import SuperButton from "../../../../common/c2-SuperButton/SuperButton";
import s from './AddCard.module.scss'
import {useInput} from "../../../../../hooks/useInput";
import SearchInput from "../../../PacksListPage/Search/SearchInput";



type AddCardPropsType = {
    addNewCard: (question: string, answer: string) => void
}

const AddCard = ({addNewCard}: AddCardPropsType) => {

    const question = useInput('', [])
    const answer = useInput('', [])


    const addNewCardOnClick = () => {
        addNewCard(question.value, answer.value)
    }

    return (
        <div className={s.add_packs_container}>
            <p>New card:</p>
                <SearchInput searchValue={question.value} searchOnChange={question.valueChange}
                placeholderProps={'Question'}/>
                <SearchInput searchValue={answer.value} searchOnChange={answer.valueChange} placeholderProps={'Answer'}/>

                <SuperButton onClick={addNewCardOnClick}>Add card</SuperButton>

        </div>
    )
}

export default AddCard