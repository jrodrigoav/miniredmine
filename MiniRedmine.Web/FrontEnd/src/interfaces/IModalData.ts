import type ITurno from "./ITurno";
import type INewTimeEntry from "./INewTimeEntry";

export default interface IModalData {
    turno: ITurno;
    entries: INewTimeEntry[];
}