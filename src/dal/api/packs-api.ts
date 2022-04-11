import {instance} from "./auth-api";

export const packsApi = {
    getCards(cardPacksTotalCount?: number, packName?: string, min?: number, max?: number, sortPacks?: string, page?: number, user_id?: string,) {
        return instance.get<any>(`cards/pack`, {
            params: {
                packName,
                min,
                max,
                sortPacks,
                page,
                pageCount: cardPacksTotalCount,
                user_id,

            }
        })
    },
    addPack(name: string, privateBoolean: boolean) {
        return instance.post<any>(`cards/pack`, {cardsPack: {name, private: privateBoolean}})
    },
    deletePack(id: string) {
        return instance.delete<any>(`cards/pack?id=${id}`)
    },
    updatePack(id: string, newName: string) {
        return instance.put<any>(`cards/pack`, {cardsPack: {name: newName, _id: id}})
    },
}