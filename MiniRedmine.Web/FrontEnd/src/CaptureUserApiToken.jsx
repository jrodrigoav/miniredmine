import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
export function CaptureUserApiToken() {
    const [userApiToken, setUserApiToken] = useState('');
    return (<Form.Row>
        <Form.Group as={Col}>
            <InputGroup>
                <Form.Control type="text" placeholder="Redmine Api Token" onChange={e => setUserApiToken(e.target.value)} />
                <InputGroup.Append>
                    <Button variant="primary" type="button" onClick={e => props.saveToken(e, userApiToken)}>Save Token</Button>
                </InputGroup.Append>
            </InputGroup>
        </Form.Group>
    </Form.Row>);
}
