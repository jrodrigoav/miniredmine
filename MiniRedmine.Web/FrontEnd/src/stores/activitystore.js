const _REDMINE_ACTIVITIES = "REDMINE_ACTIVITIES";

import { writable } from 'svelte/store';

function createActivtiesStore() {
    const { subscribe, set, update } = writable(JSON.parse(sessionStorage.getItem(_REDMINE_ACTIVITIES) ?? '[]'));
   
    return {
        subscribe,
        updateActivities:(activities)=>update(()=>{
            sessionStorage.setItem(_REDMINE_ACTIVITIES, JSON.stringify(activities));
            return activities;
        })
    };
}

export const activities =createActivtiesStore();