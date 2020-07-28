import IActivity from "./IActivity";
import IIssue from "./IIssue";

export default interface ITemplate {
    id: string;
    issue: number;
    activity: number;
    comments: string;
    hours: number;
}