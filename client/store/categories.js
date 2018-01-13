import axios from 'axios';

const GET_CATEGORIES = 'GET_CATEGORIES';

const getCategories = categories => {
  return {
    type: GET_CATEGORIES,
    categories
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


export default function reducer(categories = [], action){
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    default:
      return categories;
  }
}
