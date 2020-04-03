import moment from 'moment';
import React from 'react';
import Form from 'react-bootstrap/Form';
import TokenService from '../services/tokenService';
import TimeEntryActivitiesSelect from './TimeEntryActivitiesSelect';
import Button from 'react-bootstrap/Button';

class NewTemplateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: -1,
            IssueId: 0,
            Comments: '',
            ActivityId: -1,
            Hours: 0.0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const inputName = event.target.name;
        if (inputName === 'IssueId') {
            this.setState({ [inputName]: parseInt(event.target.value) });
        }
        else if (inputName === 'ActivityId') {
            this.setState({ [inputName]: parseInt(event.target.value) });
        }
        else if (inputName === 'Hours') {
            this.setState({ [inputName]: parseFloat(event.target.value) });
        }
        else {
            this.setState({ [inputName]: event.target.value });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addTemplate({
            Id: moment().unix(),
            IssueId: this.state.IssueId,
            Comments: this.state.Comments,
            ActivityId: this.state.ActivityId,
            Hours: this.state.Hours
        });
    }

    render() {
        return (<Form onSubmit={this.handleSubmit}>
            <Form.Group>
                <Form.Label>Issue</Form.Label>
                <Form.Control type="text" name="IssueId" onChange={this.handleChange} />
                <Form.Label>Comments</Form.Label>
                <Form.Control type="text" name="Comments" onChange={this.handleChange} />
                <Form.Label>Activity</Form.Label>
                <TimeEntryActivitiesSelect name="ActivityId" timeEntryActivities={TokenService.getTimeEntryActivities()} onChange={this.handleChange} />
                <Form.Label>Hours</Form.Label>
                <Form.Control type="number" name="Hours" min="0" max="8" step="0.1" onChange={this.handleChange} />
                <Button type="submit" variant="success">Save</Button>
            </Form.Group>
        </Form>);
    }
}

export default NewTemplateForm;
