import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA.js'

import avatarLeaf from '../images/leaf.png'
import avatarSnow from '../images/snow.png'
import avatarTyler from '../images/tyler.png'
import avatarAnon from '../images/anon.png'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions()
  ]).then(([users, questions]) => ({
    users,
    questions
  }));
}

export function saveQuestion (question) {
  return _saveQuestion (question);
}

export function saveQuestionAnswer ({ authedUser, qid, answer }) {
  return _saveQuestionAnswer ({ authedUser, qid, answer });
}

export const avatarObj = {
  leaf: avatarLeaf,
  snow: avatarSnow,
  tyler: avatarTyler,
  anon: avatarAnon
}

export function avatarImg (avatarURL) {
  const imgKey = avatarURL.substring(
    avatarURL.search('images') + 7,
    avatarURL.search('.jpg')
  )

  switch (imgKey) {
    case 'leaf' :
      return avatarLeaf;
    case 'snow' :
      return avatarSnow;
    case 'tyler' :
      return avatarTyler;
    default :
      return avatarAnon;
  }
}