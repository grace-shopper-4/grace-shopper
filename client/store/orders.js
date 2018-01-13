import axios from 'axios'

/**
 * ACTION TYPES
 */
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'
const GET_USER_ORDERS = 'GET_USER_ORDERS'

/**
 * ACTION CREATORS
 */
const updateOrder = updatedOrder => ({type: UPDATE_ORDER_STATUS, updatedOrder})
const getUserOrders = userOrders => ({type: GET_USER_ORDERS, userOrders})

/**
 * THUNK CREATORS
 */
export const updateOrderStatus = (orderId, updatedOrder) =>
  dispatch =>
    axios.put(`api/orders/${orderId}`, updatedOrder)
      .then(res => dispatch(updateOrder(res.data)))
      .catch(err => console.error(err))

export const fetchUserOrders = (userId) =>
  dispatch => 
    axios.get(`api/orders/users/${userId}`)
.then(res => dispatch(getUserOrders(res.data)) )
    .catch(err => console.error(err))
    


/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case UPDATE_ORDER_STATUS:
      return [...state, action.updatedOrder]
      case GET_USER_ORDERS:
        return action.userOrders
    default:
      return state
  }
}
