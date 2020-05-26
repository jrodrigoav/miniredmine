const _REDMINE_USER = "REDMINE_USER";
const _REDMINE_USER_ISSUES = "REDMINE_USER_ISSUES";
const _REDMINE_USER_TEMPLATES = "REDMINE_USER_TEMPLATES";
const _REDMINE_ACTIVITIES ="REDMINE_ACTIVITIES";

const StorageService = {
    appState: {
        isRegistered: false,
        user: {},
        issues: [],
        templates: [],
        activities: []
    },
    init: async function () {
        await this.retrieveUser();
        this.retrieveIssues();
        this.retrieveTemplates();
    },
    retrieveUser: async function () {
        let userInfo = JSON.parse(localStorage.getItem(_REDMINE_USER) ?? null);
        if (userInfo) {
            this.appState.isRegistered = true;
            this.appState.user = userInfo;  
            await this.retrieveActivities();          
            return userInfo;
        }
        return {};
    },
    storeUser: function (currentUser) {
        localStorage.setItem(_REDMINE_USER, JSON.stringify(currentUser));
        this.appState.isRegistered = true;
        this.appState.user = currentUser;
    },
    retrieveIssues: function () {
        this.appState.issues = JSON.parse(localStorage.getItem(_REDMINE_USER_ISSUES) ?? '[]');
        return this.appState.issues;
    },
    storeIssues: function (issues) {
        localStorage.setItem(_REDMINE_USER_ISSUES, JSON.stringify(issues));
        this.appState.issues = issues;
    },
    retrieveTemplates: function () {
        this.appState.templates = JSON.parse(localStorage.getItem(_REDMINE_USER_TEMPLATES) ?? '[]');
        return this.appState.templates;
    },
    storeTemplates: function (templates) {
        localStorage.setItem(_REDMINE_USER_TEMPLATES, JSON.stringify(templates));
        this.appState.templates = templates;
    },
    retrieveActivities: async function () {
        this.appState.activities = JSON.parse(sessionStorage.getItem(_REDMINE_ACTIVITIES) ?? '[]');
        if(this.appState.activities === [] && this.appState.isRegistered)
        {
            const res = await fetch(`api/redmine/timeentryactivities?userApiKey=${userInfo.api_key}`);
            const activities = await res.json();
            this.storeActivities(activities);
        }
        return this.appState.activities;
    },
    storeActivities: function (activities) {
        sessionStorage.setItem(_REDMINE_ACTIVITIES, JSON.stringify(activities));;
        this.appState.activities = activities;
    }
};

export default StorageService;