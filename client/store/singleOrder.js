import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'

/**
 * ACTION CREATORS
 */
export const getOrder = order => ({type: GET_ORDER, order})

/**
 * THUNK CREATORS
 */
export const fetchOrder = id =>
  dispatch =>
    axios.get(`/api/orders/${id}`)
      .then(res =>
        dispatch(getOrder(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (order = {}, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order;
    default:
      return order
  }
}