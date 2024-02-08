import { Dispatch, SetStateAction } from "react";
import { IEntrie } from "./IEntries";

export interface IFormProps {
    name: string,
    title: string,
    type: string,
    is_required: boolean,
    entries: IEntrie,
    formReset: boolean,
    setReset: Dispatch<SetStateAction<boolean>>
}