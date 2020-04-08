import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import UserInfoService from '../services/UserInfoService';

function Login() {
    const [userApiToken, setUserApiToken] = useState(UserInfoService.getApiKey());
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };    
    const loginCallBack = () => history.replace(from);   

    async function loginUser(event) {
        event.preventDefault();
        if (userApiToken !== '') {
            let userResponse = await axios.get(`api/redmine/userinfo?userApiKey=${userApiToken}`);
            let activitiesResponse = await axios.get(`api/redmine/timeentryactivities?userApiKey=${userApiToken}`);            
            UserInfoService.signIn(userApiToken, userResponse.data, activitiesResponse.data);
            loginCallBack();
        }
    }

    return (
        <Container fluid="true">
            <Form onSubmit={loginUser}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <InputGroup>
                            <Form.Control type="text" placeholder="Redmine Api Token" value={userApiToken} onChange={e => setUserApiToken(e.target.value)} />
                            <InputGroup.Append>
                                <Button variant="primary" type="submit">Login</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
            </Form>
        </Container>
    );
}

export default Login;
