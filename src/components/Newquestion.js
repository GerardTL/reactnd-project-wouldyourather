import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { avatarImg } from '../utils/api'
import { handleSaveQuestion } from '../actions/questions'
import Page404 from './Page404';

class Newquestion extends Component {
  state = {
    loginUser: 'justLoaded',
    textOne: '',
    textTwo: ''
  }

  componentDidMount() {
    const { authedUser } = this.props;
    /* console.log('Newquestion, componentDidMount: authedUser = ' + authedUser +
    ', loginUser = ' + this.state.loginUser); */
  
    this.setState({
      loginUser: authedUser
    })
  }

  handleChange = (event) => {
    /* console.log('handleChange: ' + event.target.name + ', ' + event.target.value); */
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    /* console.log('handleSubmit: ' + this.state.textOne + ', ' + this.state.textTwo); */
    this.props.dispatch(handleSaveQuestion (
      this.state.textOne, 
      this.state.textTwo, 
      this.props.authedUser,
      () => {this.props.history.push(`/`);}
    ))
  }

  render() {
    const { authedUser, name, avatarURL } = this.props;
    /* console.log('Newquestion, render: authedUser = ' + authedUser +
    ', loginUser = ' + this.state.loginUser); */
    
    let errorMessage;

    if (this.state.loginUser === null && authedUser === 'nouser') {
      errorMessage = 'Newquestion: manually entering URL ' +
        'terminates session, with possible loss of data.';
      return <Page404 errMsg={errorMessage} />
    }

    if (this.state.loginUser === 'nouser' && authedUser === 'nouser') {
      errorMessage = 'Newquestion: sorry, you are not logged in.';
      return <Page404 errMsg={errorMessage} />
    }

    return (
      <div className="question-main">
        <h4 className="question-header">{name}: Create a New Question</h4>
        <img
            src={avatarImg(avatarURL)}
            alt={name}
            className='avatar'
        />
        <div className='question-info'>
          <h3>Would you rather...</h3>

          <div className='newq-form'>
            <form onSubmit={this.handleSubmit}>
              <input 
                type="text" 
                name="textOne" 
                placeholder="Enter Choice 1"
                title="Example: eat an apple"
                value={this.state.textOne} 
                onChange={this.handleChange}
                maxLength="50" 
                size="50"
                autoComplete="off"
                autoFocus />
              <p>or</p>
              <input 
                type="text" 
                name="textTwo" 
                placeholder="Enter Choice 2"
                title="Example: eat an orange"
                value={this.state.textTwo} 
                onChange={this.handleChange}
                maxLength="50" 
                size="50"
                autoComplete="off" />
              <button 
                type="submit"
                disabled={this.state.textOne.length <= 0 || 
                  this.state.textTwo.length <= 0}
              >Create a New Question</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  let
    name='Error',
    avatarURL = '../../images/anon.jpg';

  if (authedUser == null) {
    /* error condition, app terminated and restarted */
    /* authedUser = 'nouser'; */
  }
  else if (users[authedUser] == null) {
    /* bad authedUser */
  }
  else if (authedUser !== 'nouser') {
    name = users[authedUser].name;
    avatarURL = users[authedUser].avatarURL;
  }

  return {
    authedUser,
    name,
    avatarURL
  }
}

export default withRouter(connect(mapStateToProps)(Newquestion))