import MyModal from "../../../common/Modal/MyModal";
import AddPacks from "./AddPacks/AddPacks";
import DeletePack from "./DeletePack/DeletePack";
import UpdatePack from "./UpdatePack/UpdatePack";
import {useAppSelector} from "../../../../bll/store";
import {ModalType} from "../../../../bll/reducers/modal-reducer";

type MyModalPagePropsType = {
    addNewPack: (name: string, privateBoolean: boolean) => void
    deletePack: (id: string) => void
    updatePack: (id: string, newName: string) => void
}

const MyModalPage = ({addNewPack, deletePack, updatePack}: MyModalPagePropsType) => {
    const activeModal = useAppSelector<ModalType>(state => state.modal.activeModal)
    const title = useAppSelector<string>(state => state.modal.title)
    return (
        <MyModal activeModal={activeModal} title={title}>
            {activeModal === 'addPack' && <AddPacks addNewPack={addNewPack}/>}
            {activeModal === 'deletePack' && <DeletePack deletePack={deletePack}/>}
            {activeModal === 'updatePack' && <UpdatePack updatePack={updatePack}/>}
        </MyModal>
    )
}

export default MyModalPage