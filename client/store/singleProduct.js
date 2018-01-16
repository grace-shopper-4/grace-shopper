import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';

export const getProduct = id => ({ type: GET_PRODUCT, id })
export const editProduct = product => ({ type: UPDATE_PRODUCT, product })
export const addProduct = product => ({ type: CREATE_PRODUCT, product })
const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    id
  }
}



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
      .then(res => dispatch(editProduct(res.data)))
      .catch(err => console.error(err))
  }

  export const removedProduct = (id) => (dispatch) => {
    dispatch(deleteProduct(id));
    axios.delete(`/api/products/${id}`)
      .catch(err => console.error(err));
  };

  export const createProduct = (createdProduct) =>
  dispatch => {
    return axios.post('/api/products/', createdProduct)
      .then(res => {console.log(res.data)
        dispatch(addProduct(res.data))
      })
      .catch(err => console.error(err))
  }

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.id;
    case UPDATE_PRODUCT:
      return action.product[1][0];
   case DELETE_PRODUCT:
      return {};
    case CREATE_PRODUCT:
      return {};
    default:
      return state
  }
}