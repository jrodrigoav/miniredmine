const _REDMINE_USER_ISSUES = "REDMINE_USER_ISSUES";

import { writable } from 'svelte/store';

function createIssuesStore() {
    const { subscribe, set, update } = writable(JSON.parse(localStorage.getItem(_REDMINE_USER_ISSUES) ?? '[]'));
    return {
        subscribe,
        updateIssues: (issues) =>
            update(() => {
                localStorage.setItem(_REDMINE_USER_ISSUES, JSON.stringify(issues));
                return issues;
            })
    }
}

export const issues = createIssuesStore();