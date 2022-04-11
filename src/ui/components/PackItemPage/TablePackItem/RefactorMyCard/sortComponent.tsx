import React from 'react';
import s from "../TablePackItem.module.scss";
import {sortCardsType} from "../../../../../bll/reducers/myCard-reducer";

type SortComponentType = {
    sortCards: sortCardsType,
    title: string,
    handleOnClick: ()=>void,
    down:string,
    app: string,
    className:string
}

const SortComponent = ({sortCards, title, handleOnClick, down,app, className}:SortComponentType) => {
    return (
        <p className={className} onClick={handleOnClick}>
            {title}
            {
                sortCards !== app && sortCards !== down
                    ? <span> </span>
                    : sortCards ===  app
                        ? <span className={s.arrow}>⬆</span>
                        : <span className={s.arrow}>⬇</span>
            }

        </p>
    );
};

export default SortComponent;