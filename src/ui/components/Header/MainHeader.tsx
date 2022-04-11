import {NavLink} from "react-router-dom"
import s from './Header.module.scss'
import {useSelector} from "react-redux";
import {AppRootStateType, useAppSelector} from "../../../bll/store";


const Header = () => {

    const isFetching = useSelector<AppRootStateType, boolean>(state => state.app.isFetching)
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)

    if (!isAuth) {
        return (
            <header>
                <section className={s.navlinkContainer}>
                    <NavLink children={'Sign In'} to={'/signin'}
                             className={({isActive}) => (isActive ? s.linkActive : s.link)}/>
                </section>
                <section className={s.navlinkContainer}>
                    <NavLink children={'Sign Up'} to={'/signup'}
                             className={({isActive}) => (isActive ? s.linkActive : s.link)}/>
                </section>


                {/*<NavLink children={'Forgot pass'} to={'/forgotPass'}*/}
                {/*         className={({isActive}) => (isActive ? s.linkActive : s.link)}/>*/}
                {/*<NavLink children={'New pass'} to={'/set-new-password/:token'}*/}
                {/*         className={({isActive}) => (isActive ? s.linkActive : s.link)}/>*/}
            </header>
        )
    } else {

        return (
            <header>

                <section className={s.navlinkContainer}>
                    <NavLink children={'Profile'} to={'/profile'}
                             className={({isActive}) => (isActive ? s.linkActive : s.link)}/>
                </section>
                <section className={s.navlinkContainer}>
                    <NavLink children={'Packs list'} to={'/packsList'}
                             className={({isActive}) => (isActive ? s.linkActive : s.link)}/>
                </section>
                
                {/*<NavLink children={'Error'} to={'/error'}*/}
                {/*         className={({isActive}) => (isActive ? s.linkActive : s.link)}/>*/}
            </header>
        )
    }
}

export default Header