import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import TokenService from '../services/tokenService';

function Home() {
    const userInfo = TokenService.getUserInfo();
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

