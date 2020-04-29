import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { avatarImg } from '../utils/api'

class Logout extends Component {
  state = {
    name: '',
    avatarURL: ''
  }

  componentDidMount() {
    this.setState({ name: this.props.name, avatarURL: this.props.avatarURL })
    this.props.dispatch(setAuthedUser('nouser'));
  }

  handleClick = () => {
    this.props.history.push(`/`);
  }

  render() {
    const { name, avatarURL } = this.state;
    /* console.log('Logout: name = ' + name + ', avatarURL = ' + avatarURL) */
    
    return (
      <div className="login-box">
        <div className="login-header">
          <h3>Thank You, {name}!</h3>
          <p>We hope you enjoyed <em>Would You Rather!</em></p>
          <p>Please play again soon!</p>
        </div>

        <img
          src={avatarImg(avatarURL)}
          alt='Would You Rather?'
          className='avatar'
        />

        <button onClick={this.handleClick}>Log In</button>
        <p><a href="https://www.freepik.com/free-photos-vectors/people">People vector created by freepik - <br />www.freepik.com</a></p>
      </div>
    )
  }
}

export default withRouter(connect()(Logout))