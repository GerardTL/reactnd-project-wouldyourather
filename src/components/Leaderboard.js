import React, { Component } from 'react'
import { connect } from 'react-redux'
import Score from './Score'
import Page404 from './Page404';

class Leaderboard extends Component {
  state = {
    loginUser: 'justLoaded'
  }

  componentDidMount() {
    const { authedUser } = this.props;
    /* console.log('Leaderboard, componentDidMount: authedUser = ' + authedUser +
    ', loginUser = ' + this.state.loginUser); */
  
    this.setState({
      loginUser: authedUser
    })
  }

  render() {
    const { authedUser } = this.props;
    /* console.log('Leaderboard, render: authedUser = ' + authedUser +
    ', loginUser = ' + this.state.loginUser); */
    
    let errorMessage;

    if (this.state.loginUser === null && authedUser === 'nouser') {
      errorMessage = 'Leaderboard: manually entering URL ' +
      'terminates session, with possible loss of data.';
      return <Page404 errMsg={errorMessage} />
    }

    if (this.state.loginUser === 'nouser' && authedUser === 'nouser') {
      errorMessage = 'Leaderboard: sorry, you are not logged in.';
      return <Page404 errMsg={errorMessage} />
    }

    return (
      <div>
        <ul>
          {this.props.userIds.map((id) => (
            <li key={id} className="score">
              <Score user={this.props.users[id]} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {   
  return {
    authedUser,
    userIds: Object.keys(users).sort((a, b) => (
      Object.keys(users[b].answers).length + users[b].questions.length - 
      Object.keys(users[a].answers).length - users[a].questions.length 
    )),
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)