export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USERANSWER = 'ADD_USERANSWER'
export const ADD_USERQUESTION = 'ADD_USERQUESTION'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function addUserAnswer (authedUser, qid, answer) {
  return {
    type: ADD_USERANSWER,
    authedUser,
    qid,
    answer
  }
}

export function addUserQuestion (question) {
  return {
    type: ADD_USERQUESTION,
    id: question.id,
    authedUser: question.author
  }
}