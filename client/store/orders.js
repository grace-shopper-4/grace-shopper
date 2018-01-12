import axios from 'axios'

/**
 * ACTION TYPES
 */
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'

/**
 * ACTION CREATORS
 */
const updateOrder = updatedOrder => ({type: UPDATE_ORDER_STATUS, updatedOrder})

/**
 * THUNK CREATORS
 */
export const updateOrderStatus = (orderId, updatedOrder) =>
  dispatch =>
    axios.put(`api/orders/${orderId}`, updatedOrder)
      .then(res => dispatch(updateOrder(res.data)))
      .catch(err => console.error(err))


/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case UPDATE_ORDER_STATUS:
      return [...state, action.updatedOrder]
    default:
      return state
  }
}
