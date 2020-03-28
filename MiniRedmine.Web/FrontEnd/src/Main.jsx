import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { TimeEntryActivitiesSelect } from './TimeEntryActivitiesSelect';

export function Main(props) {    
    return (
        <Container fluid="true">
            <Row>
                <Col>
                    <pre>{JSON.stringify(props.userInfo, null, 2)}</pre>
                    <Form>
                        <Form.Group>
                            <TimeEntryActivitiesSelect timeEntryActivities={props.timeEntryActivities} />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

