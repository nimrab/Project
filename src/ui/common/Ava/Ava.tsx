import s from './Ava.module.scss'
import {useAppSelector} from "../../../bll/store";
import image from '../../../assets/image/img.png'

type AvaPropsType = {
    newAva?: string
}

const Ava = ({newAva}: AvaPropsType) => {
    const ava = useAppSelector<string | undefined>(state => state.auth.user.avatar)
    return (
        <div className={s.ava}>
            <img src={newAva || ava || image} className={s.ava}/>
        </div>
    )
}

export default Ava