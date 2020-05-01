import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Nav (props) {
  const { authedUser, name } = props;
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
              Log Out {name}
            </Link>
            :
            ''
          }
        </li>
      </ul>
    </nav>
  )
}

export default Nav;