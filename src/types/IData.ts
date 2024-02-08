import { ICat } from "./ICat"
import { IReq } from "./IReq"

export interface IData {
    doc_name: string,
    parent_name: string,
    categories: ICat[],
    requests: IReq[]
}