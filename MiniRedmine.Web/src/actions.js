export const ADD_CREDENTIALS = 'ADD_APIKEY';
export const ADD_USERINFO = 'ADD_USERINFO';
export const ADD_TIMEENTRIES = 'ADD_TIMEENTRIES';
export const ADD_ACTIVITIES = 'ADD_ACTIVITIES';

export function addCredentials(apiKey,issueId){
    return {
        type:ADD_CREDENTIALS,
        credentials: {apiKey,issueId}
    }
}

export function addUserInfo(userId, name)
{
    return {
        type: ADD_USERINFO,
        userInfo:{userId,name}
    }
}

export function addTimeEntries(entries)
{
    return {
        type:ADD_TIMEENTRIES,
        entries: entries
    }
}

export function addActivities(activities)
{
    return {
        type:ADD_ACTIVITIES,
        activities: activities
    }
}