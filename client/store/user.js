import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {
  name: "guest",
  isGuest: true
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const update = updatedUser => ({type: UPDATE_USER, updatedUser})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method, name) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, name })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/home')
      })
      .catch(err => console.log(err))

export const updateUser = (userId, updatedUser) =>
  dispatch => {
    axios.put(`api/users/${userId}`, updatedUser)
    .then(res => res.data)
    .then(updatedUser => {
      updatedUser = _.sortBy(updatedUser, 'id')
      dispatch(update(updatedUser))
    })
    .catch(err => console.error(err))
}


/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return {...state, user: action.updatedUser}
    default:
      return state
  }
}
