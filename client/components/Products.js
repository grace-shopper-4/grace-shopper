import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store'
import {Grid, Image, Header, Card} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */

 export class Products extends Component {

  componentDidMount(){
    this.props.createCategoryState()
  }

  render(){
    const {categories} = this.props
    return (
            <div>
            <Header as="h1"> All Products </Header>
            {
             categories.map(category => {
               return (
                       <div>
                       <Header as="h2">{category.title} Boots</Header>
                       <Card.Group itemsPerRow={4}>
                       {
                        category.products.map(product =>{
                          return (
                                  <Card>
                                  <Link to={`/products/${product.id}`}>
                                  <Image src={product.photo} alt="product photo" />
                                   <Card.Content>
                                  <Card.Header className="categoryProductName">{product.title}</Card.Header>
                                  <Card.Header className="categoryProductPrice">${product.price}</Card.Header>
                                  </Card.Content>
                                  </Link>
                                  </Card>

                                  )
                        })
                      }
                      </Card.Group>
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
