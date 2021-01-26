import type ITurno from "./ITurno";

export default interface ITimeEntry {
    id: number;
    project?:string;
    spent_on: string;
    issueId:number;
    issue: string;
    activity: string;
    comments: string;
    hours: number;
    jornada: ITurno;
}