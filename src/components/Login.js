import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import group from '../images/group.png'
import Questionslist from './Questionslist'

class Login extends Component {
  state = {
    userSelected: 'noSelection',
    loggedIn: false
  }

  handleChange = (event) => {
    this.setState({
      userSelected: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.userSelected !== 'noSelection') {
      this.setState({
        loggedIn: true
      });
      this.props.dispatch(setAuthedUser(this.state.userSelected));
    }
  }

  render() {
    const imgsrc = group;
    const { users, userIds } = this.props;
    const { loggedIn } = this.state;
    /* console.log('Login: loggedIn = ' + loggedIn); */
    
    return (
      <Fragment>
        {loggedIn ? (
          <Questionslist />
        ) : (
          <div className="login-box">
            <div className="login-header">
              <h3>Welcome!</h3>
              <p><em>Would You Rather</em> is a Polling App</p>
              <p>Please Select Your Username and Sign In</p>
            </div>

            <img
              src={imgsrc}
              alt='Would You Rather?'
            />
            <form onSubmit={this.handleSubmit}>
              <select value={this.state.userSelected} onChange={this.handleChange}>
                <option key='noSelection' value='noSelection' disabled>Please select a user</option>
                {userIds.map((id) => (
                  <option key={id} value={id}>{users[id].name}</option>
                ))}
              </select>
              <button type='submit' disabled={this.state.userSelected === 'noSelection'}>Sign In</button>
            </form>
            <p><a href="https://www.freepik.com/free-photos-vectors/people">People vector created by freepik - <br />www.freepik.com</a></p>
          </div>
        )}
      </Fragment>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    userIds: Object.keys(users),
    users: users
  }
}

export default connect(mapStateToProps)(Login)