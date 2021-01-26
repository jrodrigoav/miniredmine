import { writable } from 'svelte/store';
import type ITemplate from '../interfaces/ITemplate';
const _REDMINE_USER_TEMPLATES = "REDMINE_USER_TEMPLATES";

function createTemplatesStore() {
    const templates = localStorage.getItem(_REDMINE_USER_TEMPLATES) ?? '[]';
    const jsonTemplates = JSON.parse(templates);
    const { subscribe, set, update } = writable<ITemplate[]>(jsonTemplates);
    return {
        subscribe,
        updateTemplates: (templates: ITemplate[]) =>
            update(() => {
                localStorage.setItem(_REDMINE_USER_TEMPLATES, JSON.stringify(templates));
                return templates;
            })
    }
}
export const templates = createTemplatesStore();
