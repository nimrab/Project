import React from "react";
import preloader from "../../../assets/preloader/preloader.svg"
import s from "./Preloader.module.scss"


const Preloader = () => {
    return <div className={s.preloaderContainer}><img src={preloader} className={s.preloader}/></div>
}

export default Preloader