import ITurno from "./ITurno";
import ITemplate from "./ITemplate";
import INewTimeEntry from "./INewTimeEntry";

export default interface IModalData {
    turno: ITurno;
    entries: INewTimeEntry[];
}