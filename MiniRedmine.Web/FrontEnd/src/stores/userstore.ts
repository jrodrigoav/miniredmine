import { writable } from 'svelte/store';
import type IUser from '../interfaces/IUser';

const _REDMINE_USER = "REDMINE_USER";

function createUserStore() {
    const user = localStorage.getItem(_REDMINE_USER) ?? JSON.stringify({unauthorized: true});
    const jsonUser = JSON.parse(user);
    const { subscribe, set, update } = writable<IUser>(jsonUser);
    return {
        subscribe,
        register: (currentUser:IUser) => update(()=>{
            localStorage.setItem(_REDMINE_USER, JSON.stringify(currentUser));
            return currentUser;
        })        
    }
}

export const user = createUserStore();