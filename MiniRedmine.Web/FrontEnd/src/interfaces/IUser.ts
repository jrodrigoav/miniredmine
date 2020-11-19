export default interface IUser {
    id: number;
    login: string;
    lastname: string;
    last_login_on?: string;
    created_on:string;
    firstname: any;
    unauthorized: boolean;
    api_key:string;
}