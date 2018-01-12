import axios from 'axios'

/**
 * ACTION TYPES
 */

const POST_REVIEW = 'POST_REVIEW'

/**
 * ACTION CREATORS
 */
const postNewReview = review => ({type: POST_REVIEW, review})

/**
 * THUNK CREATORS
 */

export const postReview = review =>
  dispatch =>
    axios.post('/api/reviews', review)
      .then(res =>
          dispatch(postNewReview(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case POST_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
}


