import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { avatarImg } from '../utils/api'

class Questionsub extends Component {
  handleVoteClick = (e, id) => {
    /* console.log('handleVoteClick: ' + e.target + ', ' + e.type); */
    this.props.history.push(`/questions/${id}`);
  }

  handlePollClick = (e, id) => {
    /* console.log('handlePollClick: ' + e.target + ', ' + e.type); */
    this.props.history.push(`/questions/${id}`);
  }

  render() {
    const { id, user, question } = this.props;
    /* console.log('Questionsub: id = ' + id); */

    return ( 
      <div className='question-sub'>
        <h4 className='question-header'>{user.name} asks:</h4>
        <img
          src={avatarImg(user.avatarURL)}
          alt={user.name}
          className='avatar'
        />
        <div className='question-info'>
          <h4>Would you rather</h4>
          <p>
            ...{question.optionOne.text + ' or '
              + question.optionTwo.text}
          </p>
          <button onClick={(e) => this.handleVoteClick(e, id)} disabled={this.props.voted}>Vote</button>
          <button onClick={(e) => this.handlePollClick(e, id)} disabled={!this.props.voted}>
            View Poll
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id}) {
  const question = questions[id];

  return {
    authedUser,
    user: users[question.author],
    question: question
  }
}

export default withRouter(connect(mapStateToProps)(Questionsub))