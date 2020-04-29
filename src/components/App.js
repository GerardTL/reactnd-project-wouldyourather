import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Nav from './Nav';
import Login from './Login';
import Questionslist from './Questionslist';
import Question from './Question';
import Newquestion from './Newquestion';
import Leaderboard from './Leaderboard';
import Logout from './Logout';
import { avatarImg } from '../utils/api';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { authedUser, name, avatarURL } = this.props;
    const loggedIn = (authedUser !== null && authedUser !=='nouser');
    /* console.log('App.js, render(): authedUser = ' + authedUser); */

    return (
      <Router>
        <Fragment>
        <LoadingBar />
        <div className="container">
          <h2 className='center'>Would You Rather</h2>
          <Nav />

          {loggedIn &&
            <Fragment>
            <div className="userbox-left"></div>
            <div className="userbox-right">
              <img
                src={avatarImg(avatarURL)}
                alt={name}
                className='avatar'
              />
              <p><strong>Welcome!</strong><br />{name}</p>
            </div>
            </Fragment>
          }

          <Route path='/' exact>
            {!loggedIn ?
              <Login />
            :
              <Questionslist />}
          </Route>
          <Route path='/questions/:id' component={Question} />
          <Route path='/add' component={Newquestion} />
          <Route path='/leaderboard' component={Leaderboard} />
          <Route path='/logout'>
            <Logout name={name} avatarURL={avatarURL} />
          </Route>

        </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser, users }) {
  let 
    name = '', 
    avatarURL = '../../images/anon.jpg';

  if(authedUser !== null && authedUser !=='nouser') {
    name = users[authedUser].name;
    avatarURL = users[authedUser].avatarURL;
  }

  return {
    authedUser,
    name,
    avatarURL
  };
}

export default connect(mapStateToProps)(App);