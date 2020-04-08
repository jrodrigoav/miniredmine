import concat from 'lodash/concat';
import moment from 'moment';
import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Row from 'react-bootstrap/Row';
import SimpleCaptureItemUserForm from './SimpleCaptureItemUserForm';


function SimpleCaptureItem({ now, dateItem, userTimeEntries, userTemplates, saveTimeEntries }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (userTimeEntries.length > 0) {
            console.log('From Item');
            console.log(userTimeEntries);
            setTasks([{ Id: moment().unix(), IssueId: 0, ActivityId: -1, Hours: 1, Comments: 'Comments' }]);
        }
        else {
            setTasks(userTemplates);
        }
    }, [userTimeEntries]);

    let displayActionButtons = false;

    function handleChange(event, index) {

        let newTasks = index < 0 ? [{}] : Array.from(tasks);
        const inputName = event.target.name;
        let updatedTask = newTasks[index < 0 ? 0 : index];
        if (inputName === 'IssueId') {
            try {
                const value = parseInt(event.target.value);
                updatedTask = Object.assign(updatedTask, { [inputName]: value });
            } catch{ console.warn('Only numbers allowed'); }
        }
        else if (inputName === 'ActivityId') {
            try {
                const value = parseInt(event.target.value);
                updatedTask = Object.assign(updatedTask, { [inputName]: value });
            } catch{ console.warn('Only numbers allowed'); }
        }
        else if (inputName === 'Hours') {
            try {
                const value = parseFloat(event.target.value);
                updatedTask = Object.assign(updatedTask, { [inputName]: value });
            } catch{ console.warn('Only numbers allowed'); }
        }
        else {
            updatedTask = Object.assign(updatedTask, { [inputName]: event.target.value });
        }

        newTasks[index] = updatedTask;
        setTasks(newTasks);
    }

    function addTask(event) {
        const newTask = { Id: moment().unix(), IssueId: 0, ActivityId: -1, Hours: 1, Comments: 'Comments' };
        const newTasks = concat(tasks, newTask);
        setTasks(newTasks);
    }

    function removeTask(index) {
        let newTasks = Array.from(tasks);
        if (newTasks.length > 1) {
            newTasks.splice(index, 1);
            setTasks(newTasks);
        }
    }

    function saveTasks() {
        saveTimeEntries(dateItem.format('YYYY-MM-DD'), tasks);
    }

    let userTemplateItems = <React.Fragment />;
    let actionButtons = <React.Fragment />;
    const userTimeItems = userTimeEntries.map(entry => <ListGroupItem key={entry.id}>Issue: {entry.issue.id} | Hours: {entry.hours} | {entry.activity.name} | {entry.comments} </ListGroupItem>);

    if (now.isAfter(dateItem)) {
        userTemplateItems = tasks.map((entry, index) => <SimpleCaptureItemUserForm key={index} entry={entry} handleChange={event => handleChange(event, index)} removeTask={() => removeTask(index)} />);
        displayActionButtons = true;
    }
    if (displayActionButtons) {
        actionButtons = (
            <Col>
                <ButtonGroup vertical>
                    <Button variant="secondary" onClick={addTask}>Add Task</Button>
                    <Button variant="success" onClick={saveTasks}>Save</Button>
                </ButtonGroup>
            </Col>
        );
    }
    const itemVariant = dateItem.day() === 5 || dateItem.day() === 6 ? 'danger' : 'primary';
    return (
        <ListGroupItem variant={itemVariant}>
            <h6>{dateItem.format('dddd')}&nbsp;<small>{dateItem.format('YYYY-MM-DD')}</small></h6>
            <Row>
                <Col xs={10}>
                    <ListGroup>
                        {userTimeItems}
                    </ListGroup>
                    <ListGroup>
                        {userTemplateItems}
                    </ListGroup>
                </Col>
                {actionButtons}
            </Row>
        </ListGroupItem>);
}

export default SimpleCaptureItem;
