import React from 'react';
import {PropTypes} from 'prop-types';
import {connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

class TimeEntryRow extends React.Component {
    static propTypes ={
        credentials:PropTypes.object.isRequired,
        entry:PropTypes.object.isRequired,
        activities:PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            entry: props.entry,
            action: 'Existing'
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveEntry = this.saveEntry.bind(this);
        this.createSelectItems = this.createSelectItems.bind(this);
    }

    handleInputChange(e) {
        e.preventDefault();
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let entry = { ...this.state.entry };
        entry = Object.assign(entry, { [name]: value });
        this.setState({ entry });
    }

    saveEntry(e) {
        e.preventDefault();
        this.btn.setAttribute('disabled', 'disabled');
        let payload = {
            activityId: this.state.entry.activityId,
            spentOn: this.state.entry.spentOn,
            hours: this.state.entry.hours,
            comments: this.state.entry.comments
        };

        axios
            .post('/api/redmine/timeentries', payload, {
                headers: {
                    'X-ApiKey': this.props.credentials.apiKey,
                    'X-IssueId': this.props.credentials.issueId
                }
            })
            .then(response => {
                console.log(response);
                var entry = { ...this.state.entry };
                entry = Object.assign(entry, response.data);
                this.setState({ entry });
            }
                , err => this.setState({ action: err.message }));
    }

    createSelectItems() {
        let items = [];
        let activities = this.props.activities || [];

        for (let i = 0; i < activities.length; i++) {
            let key = activities[i].id;
            let value = activities[i].name;
            items.push(
                <option key={key} value={key}>
                    {value}
                </option>
            );
        }
        return items;
    }

    render() {
        let entry = null;
        let weekday = moment(this.state.entry.spentOn).format('dddd');
        let dateMsg=`${weekday} - ${this.state.entry.spentOn}`;
        if (this.state.entry.id <= 0) {
            let message = this.state.action !== 'Existing' ? this.state.action : 'Save';
            entry = (
                <tr className="d-flex">
                    <th className="col-3">{dateMsg}</th>
                    <th className="col-4">
                        <input
                            className="form-control"
                            type="text"
                            name="comments"
                            value={this.state.entry.comments}
                            onChange={this.handleInputChange}
                        />
                    </th>
                    <th className="col-3">
                        <select
                            className="form-control"
                            name="activityId"
                            value={this.state.entry.activityId}
                            onChange={this.handleInputChange}
                        >
                            {this.createSelectItems()}
                        </select>
                    </th>
                    <th className="col-1">
                        <input
                            className="form-control"
                            type="number" step="0.1"
                            name="hours"
                            value={this.state.entry.hours}
                            onChange={this.handleInputChange}
                        />
                    </th>
                    <th className="col-1">
                        <button
                            ref={btn => (this.btn = btn)}
                            className="btn btn-default"
                            type="button"
                            onClick={this.saveEntry}
                        >
                            {message}
                        </button>
                    </th>
                </tr>
            );
        } else {
            entry = (
                <tr className="d-flex">
                    <th className="col-3">{dateMsg}</th>
                    <th className="col-4">{this.state.entry.comments}</th>
                    <th className="col-3">{this.state.entry.activityName}</th>
                    <th className="col-1">{this.state.entry.hours}</th>
                    <th className="col-1">{this.state.action}</th>
                </tr>
            );
        }

        return entry;
    }
}
const mapStateToProps = (state, ownProps) =>({
    credentials:state.appState.credentials
  });
  TimeEntryRow = connect(mapStateToProps)(TimeEntryRow);
export default TimeEntryRow;
