export default interface IUser {
    id: number;
    login: string;
    lastname: string;
    last_login_on?: Date;
    created_on:Date;
    firstname: any;
    unauthorized: boolean;
    api_key:string;
}