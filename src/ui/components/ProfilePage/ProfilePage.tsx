import s from './ProfilePage.module.scss'
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import Ava from "../../common/Ava/Ava";
import {UserType} from "../../../bll/reducers/auth-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {Navigate, useNavigate} from "react-router-dom";
import image from '../../../assets/image/img.png'


const ProfilePage = () => {
    const user = useSelector<AppRootStateType, UserType>(state => state.auth.user)
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    const navigate = useNavigate()


    const profileSettings = () => {
        navigate("/profileSettings")
    }

    if (!isAuth) {
        return <Navigate to={'/signin'}/>
    }

    return (

        <section className={`${s.box}`}>
            <h3>Personal Information</h3>
            <Ava/>
            <div className={s.userData}>
                <p>email:<a> {user.email}</a></p>
                <p>Public card packs count:<a> {user.publicCardPacksCount}</a></p>
                <p>nik name:<a> {user.name}</a></p>
            </div>
            <div className={s.button_block}>
                <SuperButton onClick={profileSettings}>Edit profile</SuperButton>
                <SuperButton onClick={() => navigate('/packsList')}>Packs list</SuperButton>
            </div>
        </section>
    )
}

export default ProfilePage