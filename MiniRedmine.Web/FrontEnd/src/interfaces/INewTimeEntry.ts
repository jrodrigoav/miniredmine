import ITurno from "./ITurno";
import IActivity from "./IActivity";
import IIssue from "./IIssue";
import IIdName from "./IIdName";

export default interface INewTimeEntry {
    id: string;
    spent_on: string;
    issue: IIdName;
    activity: IIdName;
    comments: string;
    hours: number;
    totalhours?:number;
    turno?:ITurno;
    empty:boolean;
}