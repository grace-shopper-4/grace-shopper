import axios from 'axios';

const GET_CURRENT_ORDER = 'GET_CURRENT_ORDER';

const getCurrentOrder = order => ({type: GET_CURRENT_ORDER, order})

export const fetchOrder = (userId) => dispatch => {
  axios.get(`/api/orders/${userId}`)
    .then(res => dispatch(getCurrentOrder(res.data)))
    .catch(err => console.error(err))
}

export default function reducer(order = [], action){
  switch (action.type) {
    case GET_CURRENT_ORDER:
      return action.order;
    default:
      return order;
  }
}
