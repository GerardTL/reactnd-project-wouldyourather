import React, { Component } from 'react';
import groupRandom from '../images/group_random.png';
import Login from './Login';

class Page404 extends Component {
  state={
    toLogin: false
  }

  handleClick = () => {
    this.setState({ toLogin: true });
  }

  render() {
    const { authedUser, errMsg } = this.props;
    /* console.log('Page404, authedUser = ' + authedUser +
      ', errMsg = ' + errMsg); */
    const msgText = errMsg == null || errMsg.length <= 0 ?
      'The app can only respond if you are logged in!'
      :
      errMsg;

    if (authedUser === 'nouser' && this.state.toLogin) {
      return <Login />
    }

    return (
      <div className="login-box">
        <div className="login-header">
          <h3>Oops!&nbsp;&nbsp; 404 PAGE!&nbsp;&nbsp; Oops!</h3>
          <p>{msgText}</p>
          {authedUser === 'nouser' &&
            <p>Please log in and try again!</p>
          }
        </div>

        <img
          src={groupRandom}
          alt='Would You Rather?'
        />

        {authedUser === 'nouser' &&
          <button onClick={this.handleClick}>Log In</button>
        }
        <p><a href="https://www.freepik.com/free-photos-vectors/people">People vector created by freepik - <br />www.freepik.com</a></p>
      </div>
    )
  }
}

export default Page404