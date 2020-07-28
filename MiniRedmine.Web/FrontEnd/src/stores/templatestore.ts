const _REDMINE_USER_TEMPLATES = "REDMINE_USER_TEMPLATES";
import { writable } from 'svelte/store';
import ITemplate from '../interfaces/ITemplate';

function createTemplatesStore() {
    const { subscribe, set, update } = writable<ITemplate[]>(JSON.parse(localStorage.getItem(_REDMINE_USER_TEMPLATES) ?? '[]'));
    return {
        subscribe,
        updateTemplates: (templates:ITemplate[]) =>
            update(() => {
                localStorage.setItem(_REDMINE_USER_TEMPLATES, JSON.stringify(templates));
                return templates;
            })
    }
}
export const templates = createTemplatesStore();
