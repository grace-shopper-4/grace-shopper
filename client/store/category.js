import axios from 'axios';

const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_CATEGORY = 'GET_CATEGORY';

const getCategories = categories => ({type: GET_CATEGORIES, categories})
const getCategory = category => ({type: GET_CATEGORY, category})

export const fetchCategories = () => dispatch => {
  axios.get('/api/categories')
    .then(res => dispatch(getCategories(res.data)))
    .catch(err => console.error(err))
}

export const fetchCategory = categoryId => dispatch => {
  axios.get(`/api/categories/${categoryId}`)
    .then(res => dispatch(getCategory(res.data)))
    .catch(err => console.error(err))
}

export default function reducer(categories = [], action){
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    case GET_CATEGORY:
      return action.category;
    default:
      return categories;
  }
}
