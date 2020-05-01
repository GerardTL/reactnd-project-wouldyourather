import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Questionsub from './Questionsub';

class Questionslist extends Component {
  state = {
    showAnswered: false
  }

  handleTabClick = (event) => {
    if (this.state.showAnswered === (event.target.name === 'btnUnans')) {
      this.setState({
        showAnswered: !this.state.showAnswered
      })  
    }
    /* console.log('handleTabClick: ' + event.target.name + ', ' + this.state.showAnswered); */
  }

  render() {
    /* console.log('Questionslist: this.props = ' + this.props); */
    const bgLight = '#f8ead5', bgDark = '#cfb289';
    const showAnswered = this.state.showAnswered;
    const { authedUser, questionIds, questions } = this.props;

    const displayIds = questionIds.filter((id) => {
      let voted = false;
      if (questions[id].optionOne.votes.indexOf(authedUser) > -1) {
        voted = true;
      }
      else if (questions[id].optionTwo.votes.indexOf(authedUser) > -1) {
        voted = true;
      }
      return showAnswered === voted;
    });

    let nAnswered, nUnanswered;
    if (showAnswered) {
      nAnswered = displayIds.length;
      nUnanswered = questionIds.length - nAnswered;
    }
    else {
      nUnanswered = displayIds.length;
      nAnswered = questionIds.length - nUnanswered;
    }

    return (
      <Fragment>
        <div className='group-selector'>
          <div className='group-button' style={{backgroundColor: showAnswered ? bgLight : bgDark}}>
            <button name='btnUnans' onClick={this.handleTabClick}>
              Unanswered Questions ({nUnanswered})
            </button>
          </div>
          <div className='group-button' style={{backgroundColor: showAnswered ? bgDark : bgLight}}>
            <button name='btnAns' onClick={this.handleTabClick}>
              Answered Questions ({nAnswered})
            </button>
          </div>
        </div>

        <div className='questions-list'>
          <ul>
            {displayIds.map((id) => (
              <li key={id}>
                <Questionsub id={id} voted={this.state.showAnswered} />
              </li>
            ))}
          </ul>
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps ({ authedUser, questions }) {
  return {
    authedUser,
    questionIds: Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    questions
  }
}

export default connect(mapStateToProps)(Questionslist)