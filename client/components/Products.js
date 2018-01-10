import React, {Component} from 'react'
import {connect} from 'react-redux'
// import store from '../store'
import {fetchCategories, fetchAllProducts} from '../store'
/**
 * COMPONENT
 */

export class Products extends Component {

  componentDidMount(){
    this.props.createCategoryState()
  }

  render(){
    const {categories, products} = this.props
    return (
      <div>
        <h1> All Products </h1>
        {
           categories.map(category => {
            console.log(category.products)
             return (
           <div key={category.id}>
           <h2>{category.title} Boots</h2>
           {
            category.products.map(product =>{
              return (
            <div key={product.id}>

            <h3>{product.title}</h3>
            <h4>{product.price}</h4>
            </div>
            )
           })
         }
           </div>
                       )
         })
        }
      </div>
    )
   }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    categories: state.categories,
    // products: state.products
  }
}

const mapDispatch = (dispatch) => {
  return {
    createCategoryState () {
      dispatch(fetchCategories())
    }
  }
}

export default connect(mapState, mapDispatch)(Products)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
