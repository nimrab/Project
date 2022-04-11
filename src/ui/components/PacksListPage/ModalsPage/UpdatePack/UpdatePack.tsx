import SuperButton from "../../../../common/c2-SuperButton/SuperButton";
import s from './UpdatePack.module.scss';
import {useInput} from "../../../../../hooks/useInput";
import {useAppSelector} from "../../../../../bll/store";
import SearchInput from "../../Search/SearchInput";

type updateNamePacksPropsType = {
    updatePack: (id: string, newName: string) => void
}

const UpdatePack = ({updatePack}: updateNamePacksPropsType) => {

    const id = useAppSelector<string>(state => state.modal.id)
    const name = useAppSelector<string>(state => state.modal.name)

    const newName = useInput(name, [])

    const updatePackName = () => {
        updatePack(id, newName.value)
    }

    return (
        <div className={s.add_packs_container}>
            <p>New name:</p>
            <SearchInput searchValue={newName.value} searchOnChange={newName.valueChange} placeholderProps={'Name'}/>

            <SuperButton onClick={updatePackName}>Update name</SuperButton>
        </div>
    )
}

export default UpdatePack