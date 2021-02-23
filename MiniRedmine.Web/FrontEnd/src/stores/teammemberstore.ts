import { writable } from 'svelte/store';
const _REDMINE_TEAM_MEMBERS = "REDMINE_TEAM_MEMBERS";

function createTeamMemberStore() {
    const teamMembers = localStorage.getItem(_REDMINE_TEAM_MEMBERS) ?? '[]';
    const jsonMembers = JSON.parse(teamMembers);
    const { subscribe, set, update } = writable<number[]>(jsonMembers);
    return {
        subscribe,
        updateMembers: (teamMembers: number[]) =>
            update(() => {
                localStorage.setItem(_REDMINE_TEAM_MEMBERS, JSON.stringify(teamMembers));
                return teamMembers;
            })
    }
}

export const teamMembers = createTeamMemberStore();