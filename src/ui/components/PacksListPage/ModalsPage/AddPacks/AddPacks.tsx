import SuperButton from "../../../../common/c2-SuperButton/SuperButton";
import s from './AddPacks.module.scss'
import {useInput} from "../../../../../hooks/useInput";
import SuperCheckbox from "../../../../common/c3-SuperCheckbox/SuperCheckbox";
import {useState} from "react";
import SearchInput from "../../Search/SearchInput";

type AddPacksPropsType = {
    addNewPack: (name: string, privateBoolean: boolean) => void
}

const AddPacks = ({addNewPack}: AddPacksPropsType) => {

    const namePack = useInput('', [])
    const [privateBoolean, setPrivateBoolean] = useState<boolean>(false)

    const addNewPackOnClick = () => {
        addNewPack(namePack.value, privateBoolean)
    }

    return (
        <div className={s.add_packs_container}>
            <p>New pack:</p>
            <SearchInput searchValue={namePack.value} searchOnChange={namePack.valueChange} placeholderProps={'Name'} />
            <SuperCheckbox checked={privateBoolean}
                           onChange={e => setPrivateBoolean(e.currentTarget.checked)}>
                Private
            </SuperCheckbox>
            <SuperButton onClick={addNewPackOnClick}>Add cards</SuperButton>
        </div>
    )
}

export default AddPacks