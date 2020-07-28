const _REDMINE_USER_ISSUES = "REDMINE_USER_ISSUES";

import { writable } from 'svelte/store';
import IIssue from "../interfaces/IIssue";

function createIssuesStore() {
    const { subscribe, set, update } = writable<IIssue[]>(JSON.parse(localStorage.getItem(_REDMINE_USER_ISSUES) ?? '[]'));
    return {
        subscribe,
        updateIssues: (issues:IIssue[]) =>
            update(() => {
                localStorage.setItem(_REDMINE_USER_ISSUES, JSON.stringify(issues));
                return issues;
            })
    }
}

export const issues = createIssuesStore();