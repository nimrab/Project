import s from './HeaderTable.module.scss'
import {sortPacksType} from "../../PacksListPageContainer";

type HeaderTablePropsType = {
    sortPacks: sortPacksType
    setSortPacks: (value: sortPacksType) => void
}

const HeaderTable = ({sortPacks, setSortPacks}: HeaderTablePropsType) => {

    const cardsSort = () => {
        if (sortPacks !== "1cardsCount" && sortPacks !== '0cardsCount') {
            setSortPacks('1cardsCount')
        } else if (sortPacks === "1cardsCount") {
            setSortPacks('0cardsCount')
        } else {
            setSortPacks('1cardsCount')
        }
    }

    const updateSort = () => {
        if (sortPacks !== '1updated' && sortPacks !== '0updated') {
            setSortPacks('1updated')
        } else if (sortPacks === "1updated") {
            setSortPacks('0updated')
        } else {
            setSortPacks('1updated')
        }
    }
    return (
        <header className={s.pack}>
            <p className={s.pack_block_name}>Name</p>
            <p className={`${s.pack_block_cards} ${s.p_sort}`} onClick={cardsSort}>
                Cards
                {
                    sortPacks !== "1cardsCount" && sortPacks !== '0cardsCount'
                        ? <span></span>
                        : sortPacks === "1cardsCount"
                            ? <span className={s.arrow}>⬆</span>
                            : <span className={s.arrow}>⬇</span>
                }
            </p>
            <p className={`${s.pack_block_update} ${s.p_sort}`} onClick={updateSort}>
                Last update
                {
                    sortPacks !== '1updated' && sortPacks !== '0updated'
                        ? <span></span>
                        : sortPacks === "1updated"
                            ? <span className={s.arrow}>⬆</span>
                            : <span className={s.arrow}>⬇</span>
                }
            </p>
            <p className={s.pack_block_createdBy}>Create by</p>
            <p className={s.pack_block_action}>Actions</p>
        </header>
    )
}
export default HeaderTable