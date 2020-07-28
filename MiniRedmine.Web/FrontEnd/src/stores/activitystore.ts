const _REDMINE_ACTIVITIES = "REDMINE_ACTIVITIES";

import { writable } from 'svelte/store';
import IActivity from '../interfaces/IActivity';

function createActivtiesStore() {
    const { subscribe, set, update } = writable<IActivity[]>(JSON.parse(sessionStorage.getItem(_REDMINE_ACTIVITIES) ?? '[]'));
   
    return {
        subscribe,
        updateActivities:(activities:IActivity[])=>update(()=>{
            sessionStorage.setItem(_REDMINE_ACTIVITIES, JSON.stringify(activities));
            return activities;
        })
    };
}

export const activities =createActivtiesStore();