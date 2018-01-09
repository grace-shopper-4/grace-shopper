import axios from 'axios';

const GET_CATEGORY = 'GET_CATEGORY';

const getCategory = category => ({type: GET_CATEGORY, category})

export const fetchCategory = categoryId => dispatch => {
  axios.get(`/api/categories/${categoryId}`)
    .then(res => dispatch(getCategory(res.data)))
    .catch(err => console.error(err))
}

export default function reducer(categories = {}, action){
  switch (action.type) {
    case GET_CATEGORY:
      return action.category;
    default:
      return categories;
  }
}
