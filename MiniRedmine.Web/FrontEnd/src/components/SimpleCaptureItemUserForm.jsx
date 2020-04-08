import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import UserInfoService from '../services/UserInfoService';

function SimpleCaptureItemUserForm({ entry, removeTask, handleChange }) {
    const timeEntryActivities = UserInfoService.getTimeEntryActivities();
    const selectOptions = timeEntryActivities.map((item, index) => <option key={index} value={item.id}>{item.name}</option>);
    return (
        <ListGroupItem>
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Control type="text" name="IssueId" value={entry.IssueId} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control type="text" name="Comments" maxLength="254" value={entry.Comments} onChange={handleChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Control type="number" name="Hours" min="0.0" max="24" step="0.1" value={entry.Hours} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control as="select" value={entry.ActivityId} name="ActivityId" onChange={handleChange}>
                            <option key={-1} value="">--- Select Activity ---</option>
                            {selectOptions}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
            </Form>
            <Button size="sm" variant="danger" className="float-right" onClick={removeTask} ><i className="fas fa-trash"></i></Button>
        </ListGroupItem>
    );
};
export default SimpleCaptureItemUserForm;