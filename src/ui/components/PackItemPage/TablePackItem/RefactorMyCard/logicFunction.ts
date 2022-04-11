import {sortCardsType} from "../../../../../bll/reducers/myCard-reducer";

export const logicFunction = (sortCards:sortCardsType, setSortCards: (sortCards: sortCardsType) => void, app:sortCardsType, down:sortCardsType) => {
    if (sortCards !== app && sortCards !== down) {
        setSortCards(app)
    } else if (sortCards === app) {
        setSortCards(down)
    } else {
        setSortCards(app)
    }
}