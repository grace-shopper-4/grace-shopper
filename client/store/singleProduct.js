import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'

export const getProduct = id => ({type: GET_PRODUCT, id})


/**
 * THUNK CREATORS
 */
export const fetchProduct = id =>
  dispatch =>
    axios.get(`/api/products/${id}`)
      .then(res =>
        dispatch(getProduct(res.data)))
      .catch(err => console.log(err))
  
      
 

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.id;
    default:
      return state
  }
}