import React from 'react';
import s from './CheckEmail.module.scss'
import postcard from '../../../../assets/image/postcard.png'
import {useAppSelector} from "../../../../bll/store";
import {Navigate} from "react-router-dom";

export const CheckEmail = () => {

    const sentPassword = useAppSelector<string>(state => state.auth.sentPassword)

    if (!sentPassword) {
        return <Navigate to={'/signin'}/>
    }

    return (
        <section className={s.main_box}>
            <section className={s.check_email_box}>

                <div>
                    <div className={s.logo_text}>It-incubator</div>
                </div>
                <div className={s.round}><img src={postcard} alt={'postcard'}/></div>

                <div className={s.check_email_text}>Check Email</div>

                <div className={s.email_instructions}>
                    {<span className={s.email_instructions_text}>We’ve sent an Email with instructions to {sentPassword}</span>}
                </div>

            </section>
        </section>
    );
};

