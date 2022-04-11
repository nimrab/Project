import s from "./SearchInput.module.scss";

type SearchInputPropsType = {
    searchOnChange: (e: string) => void
    searchValue: string
    placeholderProps?:string
}

const SearchInput = ({searchOnChange, searchValue, placeholderProps}: SearchInputPropsType) => {
    const placeholder = '🔍Search...'

    return <input placeholder={placeholderProps || placeholder} className={s.input} name={'Name'} value={searchValue}
                  onChange={e => searchOnChange(e.currentTarget.value)}/>
}

export default SearchInput