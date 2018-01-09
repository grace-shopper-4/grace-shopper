import axios from 'axios';

const GET_CATEGORIES = 'GET_CATEGORIES';

const getCategories = categories => ({type: GET_CATEGORIES, categories})

export const fetchCategories = () => dispatch => {
  axios.get('/api/categories')
    .then(res => dispatch(getCategories(res.data)))
    .catch(err => console.error(err))
}


export default function reducer(categories = [], action){
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    default:
      return categories;
  }
}
