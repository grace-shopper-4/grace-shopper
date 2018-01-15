import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const REMOVE_USERS = 'REMOVE_USERS'
/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const remove = userId => ({type: REMOVE_USERS, userId})
/**
 * THUNK CREATORS
 */
export const fetchAllUsers = () =>
  dispatch =>
    axios.get('/api/users')
      .then(res =>
        dispatch(getAllUsers(res.data)))
      .catch(err => console.log(err))

export const removeUser = userId =>
  dispatch =>{
    dispatch(remove(userId))
    return axios.delete(`/api/users/${userId}`)
      .then(res => res.data)
      .catch(err => console.log(err))
}


/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case REMOVE_USERS:
      return state.filter(user => user.id !== action.userId)
    default:
      return state
  }
}
