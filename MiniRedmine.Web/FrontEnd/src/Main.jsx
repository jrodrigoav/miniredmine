import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export function Main(props) {
    const [userApiToken, setUserApiToken] = useState('');

    return (
        <Container fluid="true">
            <Form.Row>
                <Form.Group as={Col}>
                    <InputGroup>
                        <Form.Control type="text" placeholder="Redmine Api Token" defaultValue={props.userApiToken} onChange={e => setUserApiToken(e.target.value)} />
                        <InputGroup.Append>
                            <Button variant="primary" type="button" onClick={e => props.saveToken(e, userApiToken)}>Save Token</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form.Row>
            <Row>
                <Col>
                    <pre>{JSON.stringify(props.userInfo, null, 2)}</pre>
                </Col>
            </Row>
        </Container>
    );
}