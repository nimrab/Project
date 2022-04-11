import SuperInputText from "../../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../common/c2-SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {changeProfileTC, signOutTC} from "../../../../bll/reducers/auth-reducer";
import s from "./ProfileSettings.module.scss";
import Ava from "../../../common/Ava/Ava";
import {useAppSelector} from "../../../../bll/store";
import {useNavigate} from "react-router-dom";
import image from '../../../../assets/image/img.png'
import {useInput} from "../../../../hooks/useInput";


const ProfileSettings = () => {
    const userName = useAppSelector<string>(state => state.auth.user.name)
    const userAva = useAppSelector<string>(state => state.auth.user.avatar ? state.auth.user.avatar : image)

    const name = useInput(userName, ['isEmpty', 'minLength'])
    const ava = useInput(userAva, ['isEmpty', 'minLength'])

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const nameChangeOnClickHandler = () => {
        dispatch(changeProfileTC(name.value, ava.value))
        navigate('/profile')
    }

    const signOut = () => {
        dispatch(signOutTC())
        navigate('/signin')
    }

    return (
        <section className={s.box}>
            <h3>Profile settings</h3>
            <Ava newAva={ava.value}/>
            <div className={s.input_block}>
                <SuperInputText className={s.input} name={'Ava'} value={ava.value}
                                onChange={e => ava.valueChange(e.currentTarget.value)}/>
                <SuperInputText className={s.input} name={'Name'} value={name.value}
                                onChange={e => name.valueChange(e.currentTarget.value)}/>
            </div>
            <div className={s.button_cancele_save_block}>
                <SuperButton cancel={true} onClick={() => navigate('/profile')}>cancele</SuperButton>
                <SuperButton onClick={nameChangeOnClickHandler}>Save</SuperButton>
            </div>
            <div className={s.button_signOut_block}>
                <SuperButton className={s.signOut_button} onClick={signOut}>Sign out</SuperButton>

            </div>


        </section>

    )
}

export default ProfileSettings