import {
    changeNumberPageAC,
    getCardsTC,
    PackResponseType,
    setMaxMinNumberCardsAC,
    setPageCountAC, setWhosePackAC, WhosePackType,
} from "../../../bll/reducers/packs-reducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../bll/store";
import PacksListPage from "./PacksListPage";
import {useEffect, useState} from "react";
import {useDebounce} from "../../../hooks/useDebounce";
import {addNewPackTC, deletePackTC, updatePackTC} from "../../../bll/reducers/myPacks-reducer";
import {useInput} from "../../../hooks/useInput";

export type sortPacksType = '' | '1updated' | '0updated' | '1cardsCount' | '0cardsCount'

const PacksListPageContainer = () => {

    const dispatch = useDispatch()

    const [sortPacks, setSortPacks] = useState<sortPacksType>('')

    const arrayNumbers = [4, 5, 6, 7, 8, 9, 10]
    const pageCount = useAppSelector<number>(state => state.packs.pageCount)
    const cardPacks = useAppSelector<PackResponseType[]>(state => state.packs.cardPacks)
    const myCardPacks = useAppSelector<PackResponseType[]>(state => state.myPacks.cardPacks)
    const cardPacksTotalCount = useAppSelector<number>(state => state.packs.cardPacksTotalCount)
    const page = useAppSelector<number>(state => state.packs.page)
    const minCardsCount = useAppSelector<number>(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector<number>(state => state.packs.maxCardsCount)
    const whosePack = useAppSelector<WhosePackType>(state => state.packs.whosePack)
    const packsPreloader = useAppSelector<boolean>(state => state.packs.packsPreloader)

    const myUserID = useAppSelector<string>(state => state.auth.user._id)

    const search = useInput('', [])

    const searchDebounce = useDebounce(search.value, 1500)
    const minDebounce = useDebounce(minCardsCount, 1000)
    const maxDebounce = useDebounce(maxCardsCount, 1000)

    useEffect(() => {
        dispatch(getCardsTC(whosePack, String(searchDebounce), pageCount, minCardsCount, maxCardsCount, sortPacks, page, myUserID))
    }, [pageCount, minDebounce, whosePack, maxDebounce, page, myCardPacks, searchDebounce, sortPacks])

    const setValuesOnSlider = (value: number[]) => {
        dispatch(setMaxMinNumberCardsAC(value[0], value[1]))
    }


    const changeNumberPage = (numberPage: number) => {
        dispatch(changeNumberPageAC(numberPage))
    }
    const setPageCount = (n: number) => {
        dispatch(setPageCountAC(n))
    }

    const getMyPacks = () => {
        dispatch(setWhosePackAC('myPack'))
    }
    const getALlPacks = () => {
        dispatch(setWhosePackAC('allPack'))
    }

    const addNewPack = (name: string, privateBoolean: boolean) => {
        dispatch(addNewPackTC(name, privateBoolean))
    }

    const deletePack = (id: string) => {
        dispatch(deletePackTC(id))
    }
    const updatePack = (id: string, newName: string) => {
        dispatch(updatePackTC(id, newName))

    }

    return <PacksListPage myUserID={myUserID} page={page} getMyPacks={getMyPacks} cardPacks={cardPacks}
                          getAllPacks={getALlPacks}
                          setPageCount={setPageCount} pageCount={pageCount} cardPacksTotalCount={cardPacksTotalCount}
                          maxCardsCount={maxCardsCount} minCardsCount={minCardsCount} arrayNumbers={arrayNumbers}
                          changeNumberPage={changeNumberPage} setValuesOnSlider={setValuesOnSlider}
                          whosePack={whosePack}
                          addNewPack={addNewPack}
                          searchValue={search.value} searchOnChange={search.valueChange}
                          sortPacks={sortPacks} setSortPacks={setSortPacks}
                          deletePack={deletePack} updatePack={updatePack} packsPreloader={packsPreloader}/>
}

export default PacksListPageContainer