import React from 'react'
// import {Navbar} from './Navbar'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Products = (props) => {
  console.log('props')

  return (
    <div>


    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log(state)
  return {
    categories: state.categories
  }
}

export default connect(mapState)(Products)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
