import { writable } from 'svelte/store';
import type IActivity from '../interfaces/IActivity';
const _REDMINE_ACTIVITIES = "REDMINE_ACTIVITIES";

function createActivtiesStore() {
    const activities = sessionStorage.getItem(_REDMINE_ACTIVITIES) ?? '[]';
    const jsonActivities = JSON.parse(activities);
    const { subscribe, set, update } = writable<IActivity[]>(jsonActivities);

    return {
        subscribe,
        updateActivities: (activities: IActivity[]) => update(() => {
            sessionStorage.setItem(_REDMINE_ACTIVITIES, JSON.stringify(activities));
            return activities;
        })
    };
}

export const activities = createActivtiesStore();