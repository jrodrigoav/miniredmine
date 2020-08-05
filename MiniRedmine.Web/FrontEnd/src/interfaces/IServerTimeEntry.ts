import IIdName from "./IIdName";
import IActivity from "./IActivity";

export default interface IServerTimeEntry{
    id:number;
    project:IIdName;
    issue:IIdName;
    user:IIdName;
    activity:IActivity;
    hours:number;
    comments:string;
    spent_on:string;
    created_on:Date;
    updated_on:Date;
}