import find from 'lodash/find';
import moment from 'moment';
const STORAGE_API_KEY = 'RedmineApiToken';
const TEMPLATES_STORAGE_KEY = 'MiniRedmineTemplates';

const UserInfoService = {
    isAuthenticated: false,
    _userInfo: {},
    _timeEntryActivities: [],
    _dateArray: [],
    signIn(apiToken, userInfo, timeEntryActivities) {
        this._userInfo = userInfo;
        this._timeEntryActivities = timeEntryActivities;
        localStorage.setItem(STORAGE_API_KEY, apiToken);
        this.isAuthenticated = true;
    },
    signout() {
        this.isAuthenticated = false;
        this._userInfo = {};
        this._timeEntryActivities = [];
    },
    getApiKey() {
        return localStorage.getItem(STORAGE_API_KEY) || '';
    }
    ,
    getUserInfo() {
        return this.isAuthenticated ? this._userInfo : {};
    },
    getTimeEntryActivities() {
        return this.isAuthenticated ? this._timeEntryActivities : [];
    },
    getTimeEntryActivityById(activityId) {
        let actId = new Number(activityId);
        return this.isAuthenticated ? find(this._timeEntryActivities, { id: actId }) : { name: '' };
    },
    getUserTemplates() {
        return JSON.parse(localStorage.getItem(TEMPLATES_STORAGE_KEY) || '[]');
    },
    getDateArray(minDate, maxDate) {
        if (this._dateArray.length) {
            if (this._dateArray[0].format('YYYY-MM-DD') === minDate) {
                return this._dateArray;
            }
        }
        this._dateArray = [];
        let from = moment(minDate, 'YYYY-MM-DD');
        let to = moment(maxDate, 'YYYY-MM-DD');
        do {
            this._dateArray.push(from.clone());
            from.add(1, 'days');
        } while (from.isAfter(to) === false);
        return this._dateArray;
    }
};

export default UserInfoService;