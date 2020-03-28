import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Main } from './Main';
import { MainNavigation } from './MainNavigation';
import { CaptureUserApiToken } from './CaptureUserApiToken';

function Root() {
    const STORAGE_API_KEY = 'RedmineApiToken';
    const [userApiToken, setUserApiToken] = useState('');
    useEffect(() => {
        const redmineApiToken = localStorage.getItem(STORAGE_API_KEY) || '';
        if (redmineApiToken !== '') {
            setUserApiToken(redmineApiToken);
            saveToken(null, redmineApiToken);
        }
    }, []);

    const [userInfo, setUserInfo] = useState({});
    function saveToken(event, redmineApiToken) {
        if (event !== null) {
            event.preventDefault();
            localStorage.setItem(STORAGE_API_KEY, redmineApiToken);
        }
        updateUserInfo(redmineApiToken);
    }

    function updateUserInfo(redmineApiToken) {
        axios.get(`api/redmine/userinfo?userApiKey=${redmineApiToken}`)
            .then(success => setUserInfo(success.data));
    }

    if (userInfo !== {}) {
        const [timeEntryActivities, setTimeEntryActivities] = useState([]);
        useEffect(() => {
            if (userApiToken !== '') {
                axios.get(`api/redmine/timeentryactivities?userApiKey=${userApiToken}`)
                    .then(success => setTimeEntryActivities(success.data));
            }
        }, [userInfo]);
        return (
            <React.Fragment>
                <MainNavigation userInfo={userInfo} />
                <Main userInfo={userInfo} timeEntryActivities={timeEntryActivities} />
            </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>
                <MainNavigation />
                <CaptureUserApiToken saveToken={saveToken} />
            </React.Fragment>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('miniredmine2'));