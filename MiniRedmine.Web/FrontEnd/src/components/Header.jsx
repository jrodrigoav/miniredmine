import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from 'react-router-dom';
import UserInfoService from '../services/UserInfoService';

function Header() {
    let history = useHistory();
    let userInfoNavText = <React.Fragment />;
    if (UserInfoService.isAuthenticated) {
        const userInfo = UserInfoService.getUserInfo();
        userInfoNavText = <Navbar.Text>Hello {userInfo.firstName} {userInfo.lastName}</Navbar.Text>;
    }
    return (
        <Navbar bg="primary" className="mb-3">
            <Navbar.Brand onClick={() => history.push("/")}>MiniRedmine 2</Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar-nav" />
            <Navbar.Collapse id="main-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => history.push("/SimpleCapture")}>Simple Capture</Nav.Link>
                </Nav>                
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => history.push("/Templates")}>Templates</Nav.Link>
                </Nav>
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => history.push("/PersonalReport")}>Personal Report</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            {userInfoNavText}
        </Navbar>
    );
}

export default Header;