import axios from 'axios';

const GET_CATEGORIES = 'GET_CATEGORIES';
const ADD_CATEGORY = 'ADD_CATEGORY'
// const DELETE_PRODUCT = 'DELETE_PRODUCT';

const getCategories = categories => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function addCategory(category) {
  const action = { type: ADD_CATEGORY, category };
  return action;
}

// const deleteProduct = (ids) => {
//   return {
//     type: DELETE_PRODUCT,
//     ids
//   }
// }

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


export function postCategory(category, history) {
  return function thunk(dispatch) {
    return axios.post('/api/categories', category)
      .then(res => res.data)
      .then(category => {
        dispatch(addCategory(category));
      });
  }
}


// export const removeProduct = (ids) => (dispatch) => {
//   console.log('in thunk', ids)
//   dispatch(deleteProduct(ids));
//   axios.delete(`/api/products/${ids.id}`)
//     .catch(err => console.error(err));
// };


export default function reducer(categories = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    case ADD_CATEGORY:
    return [...categories, action.category];
    // case DELETE_PRODUCT:
    //   let categoriesClone = categories;
    //   return categoriesClone.map(category => {
    //     if (category.id === action.ids.catId) {
    //       category.products = category.products.filter(product => product.id !== action.ids.id)
    //       return category
    //     }
    //     else { return category }
    //   })
    default:
      return categories;
  }
}
