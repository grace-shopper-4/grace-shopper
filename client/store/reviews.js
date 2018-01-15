import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'
const POST_REVIEW = 'POST_REVIEW'

/**
 * ACTION CREATORS
 */
const postNewReview = review => ({type: POST_REVIEW, review})
const getReviews = reviews => ({type: GET_REVIEWS, reviews})
/**
 * THUNK CREATORS
 */

export const postReview = review =>
  dispatch =>
    axios.post('/api/reviews', review)
      .then(res =>
          dispatch(postNewReview(res.data)))
      .catch(err => console.log(err))

export const fetchReviews = () =>
  dispatch =>
    axios.get('/api/reviews')
      .then(res =>
        dispatch(getReviews(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case POST_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
}


