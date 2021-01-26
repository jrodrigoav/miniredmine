import { writable } from 'svelte/store';
import type IIssue from "../interfaces/IIssue";
const _REDMINE_USER_ISSUES = "REDMINE_USER_ISSUES";

function createIssuesStore() {
    const issues = localStorage.getItem(_REDMINE_USER_ISSUES) ?? '[]';
    const jsonIssues = JSON.parse(issues);
    const { subscribe, set, update } = writable<IIssue[]>(jsonIssues);
    return {
        subscribe,
        updateIssues: (issues: IIssue[]) =>
            update(() => {
                localStorage.setItem(_REDMINE_USER_ISSUES, JSON.stringify(issues));
                return issues;
            })
    }
}

export const issues = createIssuesStore();