const _REDMINE_ACTIVITIES = "REDMINE_ACTIVITIES";

import { readable } from 'svelte/store';
import { user } from './userstore';
export const activities = readable(JSON.parse(sessionStorage.getItem(_REDMINE_ACTIVITIES) ?? '[]'), function start(set) {
    let internaluser = null;
    user.subscribe(value => {
        internaluser = value
    });
    if (internaluser.unauthorized === undefined) {
        function updateActivties() {
            async ()=>{
                console.log(user);
                const res = await fetch(`api/redmine/timeentryactivities?userApiKey=${internaluser.api_key}`);
                const activities = await res.json();
                sessionStorage.setItem(_REDMINE_ACTIVITIES, JSON.stringify(activities));
                set(activities);
            }            
        }
        updateActivties();
    }
    return function stop() { };
});