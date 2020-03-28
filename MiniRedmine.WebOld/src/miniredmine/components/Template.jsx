import React from 'react';
import { PropTypes } from 'prop-types';
class Template extends React.Component {
  static propTypes = {
    activities: PropTypes.array.isRequired,
    templateData: PropTypes.object.isRequired,
    addTemplate: PropTypes.func.isRequired,
    deleteTemplate:PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = props.templateData;

    this.addTemplate = this.addTemplate.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
    this.createSelectItems = this.createSelectItems.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  addTemplate(e) {
    e.preventDefault();
    this.props.addTemplate(this.state);
  }

  deleteTemplate(e) {
    e.preventDefault();
    this.props.deleteTemplate(this.state.id);
  }

  createSelectItems() {
    let items = [];
    let activities = this.props.activities;

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

  handleInputChange(e) {
    e.preventDefault();
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  render() {
      let message = this.state.id===null ? 'Add': 'Update';
      let deleteButton = this.state.id === null ? null : (<button type="button" className="btn btn-danger" onClick={this.deleteTemplate}>Remove</button>);
    return (
      <form onSubmit={this.addTemplate} className="form row">
        <label htmlFor="activityId" className="control-label col-1">
          Activity
        </label>
        <div className="col-2">
          <select
            className="form-control"
            name="activityId"
            value={this.state.activityId}
            onChange={this.handleInputChange}
          >
            {this.createSelectItems()}
          </select>
        </div>
        <label htmlFor="comments" className="control-label col-1">
          Comments
        </label>
        <div className="col-3">
          <input
            type="text"
            maxLength="254"
            className="form-control"
            name="comments"
            value={this.state.comments}
            onChange={this.handleInputChange}
          />
        </div>
        <label htmlFor="hours" className="control-label col-1">
          Hours
        </label>
        <div className="col-1">
          <input
            type="number" step="0.1"
            className="form-control"
            name="hours"
            value={this.state.hours}
            onChange={this.handleInputChange}
            min="0"
            max="8"
          />
        </div>
        <div className="col-3">
          <button type="submit" className="btn btn-success">
            {message}
          </button>
          {deleteButton}
        </div>
      </form>
    );
  }
}
export default Template;
