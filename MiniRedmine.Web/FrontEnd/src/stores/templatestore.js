const _REDMINE_USER_TEMPLATES = "REDMINE_USER_TEMPLATES";
import { writable } from 'svelte/store';

function createTemplatesStore() {
    const { subscribe, set, update } = writable(JSON.parse(localStorage.getItem(_REDMINE_USER_TEMPLATES) ?? '[]'));
    return {
        subscribe,
        updateTemplates: (templates) =>
            update(() => {
                localStorage.setItem(_REDMINE_USER_TEMPLATES, JSON.stringify(templates));
                return templates;
            })
    }
}
export const templates = createTemplatesStore();
