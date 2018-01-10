import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = (props) => {
  const categories = props.categories;
  const products = props.products;

  return (
    <div>
      <h3>Boot Party</h3>
      <div>Cool movie background will go here</div>
      <br/>
      {categories.map(category => {
        return (
          <div key={category.id} id="category-container">
            <div>{category.title}</div>
            <ul>
            {products.map(product => {
              return (
                <li key={product.id}>{product.title}</li>
              )
            })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = ({categories, products}) => ({categories, products})

export default connect(mapState)(Home)

// /**
//  * PROP TYPES
//  */
// Home.propTypes = {
//   email: PropTypes.string
// }
