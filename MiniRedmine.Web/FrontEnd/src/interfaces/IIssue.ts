import IIdName from "./IIdName";

export default interface IIssue{
    id:number;
    project:IIdName;
    assigned_to:IIdName;
    subject:string;
    description:string;
    start_date:string;
    spent_hours:number;
    total_spent_hours:number;
}

