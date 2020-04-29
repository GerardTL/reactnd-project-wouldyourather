import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { addUserAnswer, addUserQuestion } from '../actions/users'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTIONANSWER = 'ADD_QUESTIONANSWER'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleSaveQuestion (optionOneText, optionTwoText, author, callback) {
  return (dispatch) => {
    dispatch(showLoading());

    return saveQuestion({
      optionOneText, 
      optionTwoText, 
      author
    })
    .then((question) => {
      dispatch(addQuestion(question));
      dispatch(addUserQuestion(question));
    })
    .then(() => dispatch(hideLoading()))
    .then(callback)
  }
}

function addQuestionAnswer (authedUser, qid, answer) {
  return {
    type: ADD_QUESTIONANSWER,
    authedUser,
    qid,
    answer
  }
}

export function handleSaveQuestionAnswer (authedUser, qid, answer, callback) {
  return (dispatch, getState) => {
    dispatch(showLoading());

    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
    .then(() => {
      dispatch(addQuestionAnswer(authedUser, qid, answer));
      dispatch(addUserAnswer(authedUser, qid, answer));
    })
    .then(() => dispatch(hideLoading()))
    .then(callback)
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}