import { writable } from 'svelte/store';
import IUser from '../interfaces/IUser';

const _REDMINE_USER = "REDMINE_USER";

function createUserStore() {
    const { subscribe, set, update } = writable<IUser>(JSON.parse(localStorage.getItem(_REDMINE_USER)) ?? { unauthorized: true });
    return {
        subscribe,
        register: (currentUser:IUser) => update(()=>{
            localStorage.setItem(_REDMINE_USER, JSON.stringify(currentUser));
            return currentUser;
        })        
    }
}

export const user = createUserStore();