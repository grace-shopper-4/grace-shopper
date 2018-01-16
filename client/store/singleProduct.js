import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const getProduct = id => ({ type: GET_PRODUCT, id })
export const editProduct = product => ({ type: UPDATE_PRODUCT, product })


/**
 * THUNK CREATORS
 */
export const fetchProduct = id =>
  dispatch =>
    axios.get(`/api/products/${id}`)
      .then(res =>
        dispatch(getProduct(res.data)))
      .catch(err => console.log(err))


export const updateProduct = (productId, updatedProduct) =>
  dispatch => {
    return axios.put(`/api/products/${productId}`, updatedProduct)
      .then(res => { console.log(res.data)
        dispatch(editProduct(res.data))
      })
      .catch(err => console.error(err))
  }

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.id;
    case UPDATE_PRODUCT:
      return action.product[1][0];
    default:
      return state
  }
}