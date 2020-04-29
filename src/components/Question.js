import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { avatarImg } from '../utils/api'
import { handleSaveQuestionAnswer } from '../actions/questions'
import Page404 from './Page404'

class Question extends Component {
  state = {
    loginUser: 'justLoaded',
    option: '',
    showVote: true
  }; 

  componentDidMount() {
    if (this.props.voted) {
      this.setState({ showVote: false });
    }

    /* console.log('Question, componentDidMount: authedUser = ' + this.props.authedUser +
    ', loginUser = ' + this.state.loginUser); */
    this.setState({
      loginUser: this.props.authedUser
    });
  }

  handleChange = (e) => {
    this.setState({
      option: e.target.value
    });
  }

  handleSubmit = (e, id) => {
    e.preventDefault();
    /* console.log('handleSubmit: ' + e.type +', ' + this.state.option); */
    const { authedUser, history, dispatch } = this.props;

    if (authedUser === 'nouser') {
      history.push('/');
    }
    else {
      dispatch(handleSaveQuestionAnswer(
        authedUser, id, this.state.option,
        () => {this.setState({ showVote: false });}
      )); 
    }
  }

  render() {
    const { authedUser, id, question, name, avatarURL } = this.props;
  
    /* console.log('Question, render: ' + 
      'authedUser = ' + authedUser +
      ', loginUser = ' + this.state.loginUser +
      ', id = ' + id + 
      ', question.author = ' + question.author +
      ', showVote = ' + this.state.showVote); */

    let errorMessage;

    if (this.state.loginUser === null && authedUser === 'nouser') {
      errorMessage = 'Question: manually entering URL ' +
      'terminates session, with possible loss of data.';
      return <Page404 errMsg={errorMessage} />
    }

    if (this.state.loginUser === 'nouser' && authedUser === 'nouser') {
      errorMessage = 'Question: sorry, you are not logged in.';
      return <Page404 errMsg={errorMessage} />
    }

    let 
      optionOneCount, optionTwoCount, totalCount, 
      yourVoteOne, yourVoteTwo, 
      percentOne, percentTwo;

    if (!this.state.showVote) {
      optionOneCount = question.optionOne.votes.length;
      optionTwoCount = question.optionTwo.votes.length;
      totalCount = optionOneCount + optionTwoCount;
      yourVoteOne = question.optionOne.votes.indexOf(authedUser) > -1 ?
      'your vote' : '';
      yourVoteTwo = question.optionTwo.votes.indexOf(authedUser) > -1 ?
      'your vote' : '';

      if (totalCount <= 0) {
        percentOne = '';
        percentTwo = '';
      }
      else {
        percentOne = (100 * optionOneCount/totalCount).toFixed(2) + '%';
        percentTwo = (100 * optionTwoCount/totalCount).toFixed(2) + '%';
      }
    }

    return (
      <div className="question-main">
        <h4 className="question-header">{name} asks:</h4>
        <img
            src={avatarImg(avatarURL)}
            alt='{name}'
            className='avatar'
        />
        <div className='question-info'>

          { this.state.showVote ? (

            <Fragment>
              <h3>Would you rather</h3>
              <form onSubmit={(e) => {this.handleSubmit(e, id)}}>
                <p>
                  <label>
                    <input
                      type='radio'
                      name='userChoice' 
                      value='optionOne'
                      onChange={this.handleChange}
                      checked={this.state.option === 'optionOne'}
                    />
                    {question.optionOne.text}
                  </label>
                </p>
                <p>or</p>
                <p>
                  <label>
                    <input
                      type='radio'
                      name='userChoice' 
                      value='optionTwo'
                      onChange={this.handleChange}
                      checked={this.state.option === 'optionTwo'}
                    />
                    {question.optionTwo.text}
                  </label>
                </p>
                {authedUser === 'nouser' ? 
                  <Fragment>
                    <p>Error encountered, please log in again.</p>
                    <button type='submit'>Log In</button>
                  </Fragment>
                :  
                  <button type='submit' disabled={this.state.option.length === 0}>Vote</button>
                }
              </form>
            </Fragment>

          ) : (

            <Fragment>
              <h3>Poll Result:</h3>
              <p>Would you rather</p>
              <div className='result-summary'>
                <p>{question.optionOne.text}</p>
                <p>
                  {optionOneCount} out of {totalCount} votes: &nbsp;
                  {percentOne} &nbsp;
                  <strong>{yourVoteOne}</strong>
                </p>
              </div>
              <p>or</p>
              <div className="result-summary">
                <p>{question.optionTwo.text}</p>
                <p>
                  {optionTwoCount} out of {totalCount} votes: &nbsp;
                  {percentTwo} &nbsp;
                  <strong>{yourVoteTwo}</strong>
                </p>
              </div>
            </Fragment>
          )}

        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, {match}) {
  let 
    id = match.params.id, 
    name = 'Error', 
    avatarURL = '../../images/anon.jpg',
    voted = false;

  let question = {
    id: 'error',
    author: 'Error',
    timestamp: 0,
    optionOne: {
      votes: [],
      text: '',
    },
    optionTwo: {
      votes: [],
      text: ''
    }
  };
  
  /* console.log('Question, mapStateToProps: id = ' + id + 
    ', authedUser = ' + authedUser +
    ', question.author = ' + question.author); */

  if (authedUser == null) {
    /* error condition, recovering from crash */
  }
  else if (questions[id] == null) {
    /* bad id, question does not exist */
  }
  else if (authedUser !== 'nouser') { 
    /* good question, qood user */
    question = questions[id];
    name = users[question.author].name;
    avatarURL = users[question.author].avatarURL;

    if (question.optionOne.votes.indexOf(authedUser) > -1) {
      voted = true;
    }
    else if (question.optionTwo.votes.indexOf(authedUser) > -1) {
      voted = true;
    }
  }

  return {
    authedUser,
    id,
    question,
    name,
    avatarURL,
    voted
  }
}

export default withRouter(connect(mapStateToProps)(Question))