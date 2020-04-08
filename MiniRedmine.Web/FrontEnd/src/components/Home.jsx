import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import UserInfoService from '../services/UserInfoService';

function Home() {
    const userInfo = UserInfoService.getUserInfo();
    return (
        <Jumbotron>
            <h1>Welcome!</h1>
            <p>
                {userInfo.firstName}&nbsp;{userInfo.lastName}
            </p>
        </Jumbotron>
    );
}

export default Home;

