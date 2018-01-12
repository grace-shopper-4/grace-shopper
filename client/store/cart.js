import axios from 'axios';

const GET_CURRENT_ORDER = 'GET_CURRENT_ORDER';

export const getCurrentOrder = order => ({type: GET_CURRENT_ORDER, order})

export const fetchCurrentOrder = () => dispatch => {
  axios.get(`/api/orders/cart`)
    .then(res => res.data)
    .then(currentOrder => dispatch(getCurrentOrder(currentOrder)))
    .catch(err => console.error(err))
}

export const createNewOrder = (product, user) => dispatch => {
  axios.post('/api/orders', { product, user })
  .then(res => res.data)
  .then(newOrder => dispatch(getCurrentOrder(newOrder)))
  .catch(err => console.error(err))
}

export const addLineItem = (orderId, product) => dispatch => {
  axios.post(`/api/orders/${orderId}/lineItem`, product)
  .then(res => res.data)
  .then(updatedOrder => dispatch(getCurrentOrder(updatedOrder)))
  .catch(err => console.error(err))
}

export const updateLineItem = (orderId, product) => dispatch => {
  axios.put(`/api/orders/${orderId}/lineItem`, product)
  .then(res => res.data)
  .then(updatedOrder => dispatch(getCurrentOrder(updatedOrder)))
  .catch(err => console.error(err))
}

export const deleteLineItem = (orderId, lineItemId) => dispatch => {
  axios.delete(`/api/orders/${orderId}/lineItem/${lineItemId}`)
  .then(res => res.data)
  .then(updatedOrder => dispatch(getCurrentOrder(updatedOrder)))
  .catch(err => console.error(err))
}

export default function reducer(order = {}, action){
  switch (action.type) {
    case GET_CURRENT_ORDER:
      return action.order;
    default:
      return order;
  }
}
