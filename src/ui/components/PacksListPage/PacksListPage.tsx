import SuperButton from "../../common/c2-SuperButton/SuperButton";
import {PackResponseType, WhosePackType,} from "../../../bll/reducers/packs-reducer";
import HeaderTable from "./Table/HeaderTable/HeaderTable";
import SuperSelect from "../../common/SuperComponents/SuperSelect";
import Paginator from "../../common/Paginator/Paginator";
import s from './PacksListPage.module.scss'
import Search from "./Search/SearchInput";
import SuperDoubleRange from "../../common/SuperComponents/SuperDoubleRange";
import Ava from "../../common/Ava/Ava";
import {sortPacksType} from "./PacksListPageContainer";
import {addPackModalAC} from "../../../bll/reducers/modal-reducer";
import {useDispatch} from "react-redux";
import MyModalPage from "./ModalsPage/MyModalPage";
import Preloader from "../../common/Preloader/Preloader";
import TablePack from "./Table/TablePack/TablePack";

type PacksListPagePropsType = {
    pageCount: number
    cardPacks: PackResponseType[]
    cardPacksTotalCount: number
    page: number
    minCardsCount: number
    maxCardsCount: number
    arrayNumbers: number[]
    getMyPacks: () => void
    getAllPacks: () => void
    changeNumberPage: (numberPage: number) => void
    setPageCount: (n: number) => void
    setValuesOnSlider: (value: number[]) => void
    whosePack: WhosePackType
    myUserID: string
    searchOnChange: (e: string) => void
    searchValue: string
    sortPacks: sortPacksType
    setSortPacks: (value: sortPacksType) => void
    addNewPack: (name: string, privateBoolean: boolean) => void
    deletePack: (id: string) => void
    updatePack: (id: string, newName: string) => void
    packsPreloader: boolean
}


const PacksListPage = ({
                           pageCount,
                           cardPacks,
                           cardPacksTotalCount,
                           page,
                           minCardsCount,
                           maxCardsCount,
                           arrayNumbers,
                           getMyPacks,
                           getAllPacks,
                           changeNumberPage,
                           setPageCount,
                           setValuesOnSlider,
                           whosePack, myUserID, addNewPack, searchOnChange, searchValue,
                           sortPacks, setSortPacks,
                           deletePack, updatePack, packsPreloader
                       }: PacksListPagePropsType) => {
    const dispatch = useDispatch()

    return (
        <div className={s.packsListPageContainer}>
            <div className={s.leftBlock}>
                <div className={s.avaContainer}>
                    <Ava/>
                </div>
                <section className={s.show_packs_cards}>
                    <h6>Show packs cards</h6>
                    <section className={s.buttonSection}>
                        <SuperButton disabled={whosePack === 'myPack'} cancel={whosePack === 'myPack'}
                                     className={s.button}
                                     onClick={getMyPacks}>My</SuperButton>
                        <SuperButton disabled={whosePack === 'allPack'} cancel={whosePack === 'allPack'}
                                     className={s.button}
                                     onClick={getAllPacks}>All</SuperButton>
                    </section>
                </section>
                <section className={s.show_packs_cards}>
                    <h6>Number of cards</h6>
                    <div className={s.superRange_span_block}>
                        <span className={s.span}>{minCardsCount}</span>
                        <div className={s.superRange}>
                            <SuperDoubleRange
                                disabled={!!packsPreloader}
                                onChangeRange={setValuesOnSlider}
                                value={[minCardsCount, maxCardsCount]}
                                min={minCardsCount}
                                max={100}
                            />
                        </div>
                        <span className={s.span}>{maxCardsCount}</span>
                    </div>
                </section>

            </div>

            <div className={s.rightBlock}>
                <h2>Packs list</h2>


                <section className={s.input_button}>
                    <Search searchOnChange={searchOnChange} searchValue={searchValue}/>
                    <SuperButton disabled={!!packsPreloader} onClick={() => dispatch(addPackModalAC())}>Add new
                        pack</SuperButton>
                </section>
                <section className={s.preloaderSection}>
                    {!!packsPreloader && <Preloader/>}
                </section>
                <section className={s.table}>

                    <HeaderTable sortPacks={sortPacks} setSortPacks={setSortPacks}/>
                    {cardPacks.map(p => <TablePack key={p._id} id={p._id} myUserID={myUserID} user_id={p.user_id}
                                                   name={p.name}
                                                   cardsCount={p.cardsCount} user_name={p.user_name}
                                                   updated={p.updated}
                    />)}

                </section>


                <SuperSelect options={arrayNumbers}
                             value={pageCount}
                             onChangeOption={setPageCount}/>

                <Paginator disabled={!!packsPreloader} totalCount={cardPacksTotalCount} pageSize={pageCount}
                           currentPage={page}
                           changeNumberPage={changeNumberPage} portionSize={10}/>

            </div>
            <MyModalPage addNewPack={addNewPack} deletePack={deletePack} updatePack={updatePack}/>

        </div>
    )
}

export default PacksListPage