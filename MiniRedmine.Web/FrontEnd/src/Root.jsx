import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Main } from './Main';
import { MainNavigation } from './MainNavigation';
const STORAGE_API_KEY = 'RedmineApiToken';

function Root() {
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
        }
        if (event === null) {
            localStorage.setItem(STORAGE_API_KEY, redmineApiToken);
        }
        updateUserInfo(redmineApiToken);
    }

    function updateUserInfo(redmineApiToken) {
        axios.get(`api/redmine/userinfo?userApiKey=${redmineApiToken}`)
            .then(success => setUserInfo(success.data));
    }

    return (<React.Fragment>
        <MainNavigation userInfo={userInfo} />
        <Main saveToken={saveToken} userInfo={userInfo} userApiToken={userApiToken} />
    </React.Fragment>
    );
}

ReactDOM.render(<Root />, document.getElementById('miniredmine2'));