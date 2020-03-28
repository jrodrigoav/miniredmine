import {
    ADD_CREDENTIALS,
    ADD_USERINFO
} from '../actions';

const initialState = {
    credentials: {
        apiKey: localStorage.getItem('apiKey') || '',
        issueId: localStorage.getItem('issueId') || ''
    },
    userInfo: {
        userId: 0,
        name: ''
    }
};

function appState(state = initialState, action) {
    switch (action.type) {
        case ADD_CREDENTIALS:
            if (localStorage.getItem('apiKey') !== action.credentials.apiKey) {
                localStorage.setItem('apiKey', action.credentials.apiKey);
            }
            if (localStorage.getItem('issueId') !== action.credentials.issueId) {
                localStorage.setItem('issueId', action.credentials.issueId);
            }
            return Object.assign({}, state, {
                credentials: action.credentials
            });
        case ADD_USERINFO:
            return Object.assign({}, state, {
                userInfo: action.userInfo
            });
        default:
            return state
    }
};

export default appState;