import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import UserInformation from './UserInformation';

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { addCredentials, addUserInfo } from '../../actions';

class Home extends React.Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = props.credentials;

    this._loginUser = this._loginUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    if (this.state.apiKey) {
      this._loginUser();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this._loginUser();
  }

  handleInputChange(e) {
    e.preventDefault();
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  _loginUser() {
    axios
      .get('/api/redmine/info', {
        headers: {
          'X-ApiKey': this.state.apiKey,
          'X-IssueId': this.state.issueId
        }
      })
      .then(
        response => {
          let userInfo = {
            userId: response.data.assigned_to.id,
            name: response.data.assigned_to.name
          };
          this.props.dispatch(
            addCredentials(this.state.apiKey, this.state.issueId)
          );
          this.props.dispatch(addUserInfo(userInfo.userId, userInfo.name));
        },
        err => console.log(err)
      );
  }

  render() {
    let isLogged = this.props.userInfo.userId > 0 ? true : false;
    let content = null;
    if (isLogged === false) {
      content = (
        <UserInformation
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          apiKey={this.state.apiKey}
          issueId={this.state.issueId}
        />
      );
    } else {
      if (
        this.props.location !== undefined &&
        this.props.location.state !== undefined &&
        this.props.location.state.fromMenu == true
      ) {
        content = <h3>Welcome {this.props.userInfo.name}</h3>;
      } else {
        content = <Redirect to="/timeentries" />;
      }
    }
    return (
      <div className="container">
        <h1>Mini Redmine</h1>
        {content}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userInfo: state.appState.userInfo,
  credentials: state.appState.credentials
});
Home = connect(mapStateToProps)(Home);
export default Home;
