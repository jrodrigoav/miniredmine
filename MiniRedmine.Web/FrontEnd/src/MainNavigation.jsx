import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function MainNavigation(props) {
    const userInfoNavText = props.userInfo ? <Navbar.Text>Hello {props.userInfo.firstName} {props.userInfo.lastName}</Navbar.Text> : <React.Fragment></React.Fragment>;
    return (
        <Navbar bg="primary" className="mb-3">
            <Navbar.Brand href="#home">MiniRedmine 2</Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar-nav" />
            <Navbar.Collapse id="main-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#">Home</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            {userInfoNavText}
        </Navbar>
    );
}