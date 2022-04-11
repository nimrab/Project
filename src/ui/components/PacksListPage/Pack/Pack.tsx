import s from './Pack.module.scss'


type PackType = {
    name: string
    cardsCount: number
    updated: any
    user_name: string,
    onClick: ()=>void

}

const Pack = ({ name, cardsCount, user_name, updated, onClick}: PackType) => {

    return (
        <div className={s.pack} onClick={onClick}>
            <p className={s.pack_block_name}>{name}</p>
            <p className={s.pack_block_cards}>{cardsCount}</p>
            <p className={s.pack_block_update}>{updated}</p>
            <p className={s.pack_block_createdBy}>{user_name}</p>
            <p className={s.pack_block_action}>{updated}</p>
        </div>
    )
}
export default Pack