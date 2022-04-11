import s from '../Modal/MyModal.module.scss'
import {ModalType} from "../../../bll/reducers/modal-reducer";
import {useDispatch} from "react-redux";
import {setActiveModalCardAC} from "../../../bll/reducers/modalCard-reducer";


type ModalsPagePropsType = {
    activeModal: ModalType
    children: any
    title: string
}

const MyModalCard = ({activeModal, children, title}: ModalsPagePropsType) => {

    const dispatch = useDispatch()

    const dontActive = () => {
        dispatch(setActiveModalCardAC(false))
    }

    return (
        <div className={activeModal !== false ? `${s.modal} ${s.modal_active}` : s.modal} onClick={dontActive}>
            <div className={activeModal !== false ? `${s.modal_content} ${s.modal_content_active}` : s.modal_content}
                 onClick={e => e.stopPropagation()}>
                <section className={s.name_section}>
                    <h2>{title}</h2>
                    <p onClick={dontActive}>❌</p>
                </section>
                {children}
            </div>

        </div>
    )
}


export default MyModalCard