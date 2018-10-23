import React from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Template from './Template';

class Templates extends React.Component {
  static propTypes = {
    activities: PropTypes.array.isRequired,
    userInfo: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      templatesData: [],
      newItemKey : -1
    };
    this.addTemplate = this.addTemplate.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
    this.getTemplatesData = this.getTemplatesData.bind(this);
  }

  componentDidMount() {
    this.getTemplatesData();
  }

  getTemplatesData() {
    axios
      .get('/api/redmine/templates', {
        headers: {
          'X-UserId': '' + this.props.userInfo.userId
        }
      })
      .then(
        response => {
          this.setState(prevState=> {
            return {
            templatesData: response.data,
            newItemKey: prevState.newItemKey - 1
          }});
        },
        err => console.log(err)
      );
  }

  addTemplate(templateData) {
    axios
      .post('/api/redmine/templates', templateData, {
        headers: {
          'X-UserId': '' + this.props.userInfo.userId
        }
      })
      .then(
        response => {
          this.getTemplatesData();
        },
        err => console.log(err)
      );
  }

  deleteTemplate(templateId) {
    axios
      .delete(`/api/redmine/templates/${templateId}`,{
        headers: {
          'X-UserId': '' + this.props.userInfo.userId
        }
      })
      .then(
        response => {
          this.getTemplatesData();
        },
        err => console.log(err)
      );
  }

  render() {
    let templates = [];
    let newTemplate = null;
    let usedHours = 0;
    this.state.templatesData.forEach(i => (usedHours += i.hours));
    let errorMessage = '';
    let templateProps = {
      addTemplate: this.addTemplate,
      deleteTemplate: this.deleteTemplate,
      activities: this.props.activities,
      templateData: { }
    };

    if (usedHours >= 8) {
      errorMessage = "You can't add more than 8 hours";
    }
    templates = this.state.templatesData.map(item => {
      templateProps.templateData = item;
      return <Template key={item.id} {...templateProps} />;
    });

    if (usedHours < 8) {
      let hours= 8-usedHours;
      templateProps.templateData={
      id: null,
      hours: hours,
      comments: '',
      activityId: 9
      };
      newTemplate = <Template key={this.state.newItemKey} {...templateProps} />;
      templates.push(newTemplate);
    }


    return (
      <div className="container">
        <h1>
          Templates <small className="text-danger">{errorMessage}</small>
        </h1>
        {templates}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userInfo: state.appState.userInfo,
  activities: state.entriesState.activities
});

Templates = connect(mapStateToProps)(Templates);
export default Templates;
