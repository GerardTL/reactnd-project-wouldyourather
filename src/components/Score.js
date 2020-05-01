import React from 'react';
import { avatarImg } from '../utils/api';

function Score (props) {
  const 
    { user } = props,
    nAnswers = Object.keys(user.answers).length,
    nQuestions = user.questions.length,
    total = nAnswers + nQuestions;

  return (
    <div className="question-main">
      <h4 className="question-header">{user.name}'s Participation Score</h4>
      <img
        src={avatarImg(user.avatarURL)}
        alt={user.name}
        className='avatar'
      />

      <div className="questions-count">
        <h2>{user.name}</h2>

        <div className="item-caption">
          Answered Questions
        </div>
        <div className="item-count">{nAnswers}</div>
        <div className="item-caption clear-left">
          Created Questions
        </div>
        <div className="item-count">{nQuestions}</div>
      </div>

      <div className="questions-total">
        <h2 className="center">Score</h2>
        <h1 className="center">{total}</h1>
      </div>
    </div>
  );
}

export default Score