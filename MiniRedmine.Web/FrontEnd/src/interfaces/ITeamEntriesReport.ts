interface IMemberHours {
    issueId:Number;
    issue?:String;
    name:String;
    hours:Number;
}
export default interface ITeamEntriesReport {
    projectId:Number;
    project:String;
    memberHours:Array<IMemberHours>;
}