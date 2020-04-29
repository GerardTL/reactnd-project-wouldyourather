import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

class Nav extends Component {
  render() {
    const { users, authedUser } = this.props;
    const loggedIn = (authedUser !== null && authedUser !=='nouser');
   
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
          </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
          </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leader Board
          </NavLink>
          </li>
          <li>
            {loggedIn ?
              <Link to='/logout'>
                Log Out {users[authedUser].name}
              </Link>
              :
              ''
            }
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    authedUser: authedUser,
    users: users
  }
}

export default connect(mapStateToProps)(Nav);