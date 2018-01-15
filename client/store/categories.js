import axios from 'axios';

const GET_CATEGORIES = 'GET_CATEGORIES';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

const getCategories = categories => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

const deleteProduct = (ids) => {
  return {
    type: DELETE_PRODUCT,
    ids
  }
}

export const fetchCategories = () => dispatch => {
  axios.get('/api/categories')
    .then(res => res.data)
    .then(categoryData => {
      categoryData.forEach(category => {
        category.products.forEach(product => {
          let totalStars = 0;
          let numberOfReviews = 0;
          product.reviews.forEach(review => {
            numberOfReviews++;
            totalStars += review.stars;
          })
          if (numberOfReviews > 0) product.averageRating = totalStars / numberOfReviews;
          product.numberOfReviews = numberOfReviews;
        })
      })
      return categoryData;
    })
    .then(categories => {
      dispatch(getCategories(categories))
    })
    .catch(err => console.error(err))
}

export const removeProduct = (ids) => (dispatch) => {
  console.log('in thunk', ids)
  dispatch(deleteProduct(ids));
  axios.delete(`/api/products/${ids.id}`)
    .catch(err => console.error(err));
};


export default function reducer(categories = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    case DELETE_PRODUCT:
      let categoriesClone = categories;
      return categoriesClone.map(category => {
        if (category.id === action.ids.catId) {
          category.products = category.products.filter(product => product.id !== action.ids.id)
          return category
        }
        else { return category }
      })
    default:
      return categories;
  }
}
