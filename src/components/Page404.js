import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import groupRandom from '../images/group_random.png'

class Page404 extends Component {
  handleClick = () => {
    this.props.history.push(`/`);
  }

  render() {
    /* console.log('Page404, this.props.errMsg = ' + this.props.errMsg); */
    const { errMsg } = this.props;
    const msgText = errMsg == null || errMsg.length <= 0 ?
      'The app can only respond if you are logged in!'
      :
      errMsg;

    return (
      <div className="login-box">
        <div className="login-header">
          <h3>Oops!&nbsp;&nbsp; 404 PAGE!&nbsp;&nbsp; Oops!</h3>
          <p>{msgText}</p>
          <p>Please log in and try again!</p>
        </div>

        <img
          src={groupRandom}
          alt='Would You Rather?'
        />

        <button onClick={this.handleClick}>Log In</button>
        <p><a href="https://www.freepik.com/free-photos-vectors/people">People vector created by freepik - <br />www.freepik.com</a></p>
      </div>
    )
  }
}

export default withRouter(Page404) 