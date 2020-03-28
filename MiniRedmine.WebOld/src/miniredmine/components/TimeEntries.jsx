import React from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TimeEntryRow from './TimeEntryRow';
import { addTimeEntries, addActivities } from '../../actions';

class TimeEntries extends React.Component {
  static propTypes = {
    entries: PropTypes.array.isRequired,
    activities: PropTypes.array.isRequired,
    userInfo: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.getTimeEntries = this.getTimeEntries.bind(this);
  }

  componentDidMount() {
    if (!this.props.entries.length) {
      this.getTimeEntries();
    }
  }

  getTimeEntries() {
    axios
      .get('/api/redmine/timeentries', {
        headers: {
          'X-ApiKey': this.props.credentials.apiKey,
          'X-UserId': this.props.userInfo.userId
        }
      })
      .then(
        response => {
          this.props.dispatch(addTimeEntries(response.data.entries));
          this.props.dispatch(addActivities(response.data.activities));
        },
        err => console.log(err)
      );
  }

  render() {
    let rows = (
      <tr>
        <th colSpan="4">No entries</th>
      </tr>
    );
    let totalHours = 0;

    if (this.props.entries.length) {
      this.props.entries.forEach(i =>
        {
          if(i.id > 0)
          {
            totalHours += i.hours;
          }
        });
      rows = this.props.entries.map(item => (
        <TimeEntryRow
          key={item.id}
          entry={item}
          activities={this.props.activities}
        />
      ));
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h3>Welcome {this.props.userInfo.name}</h3>
          </div>
          <div className="col-6">
            <Link to="/templates">
              <button className="btn btn-information">
                Edit your templates
              </button>
            </Link>
            &nbsp;
            <button className="btn btn-warning" onClick={this.getTimeEntries}>
              Refresh
            </button>
          </div>
          <h3>Total registered hours: {totalHours}</h3>
          <table className="table">
            <thead>
              <tr className="d-flex">
                <th className="col-3">Date</th>
                <th className="col-4">Comments</th>
                <th className="col-3">Activity</th>
                <th className="col-1">Hours</th>
                <th className="col-1">Action</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  userInfo: state.appState.userInfo,
  credentials: state.appState.credentials,
  entries: state.entriesState.entries,
  activities: state.entriesState.activities
});

TimeEntries = connect(mapStateToProps)(TimeEntries);
export default TimeEntries;
