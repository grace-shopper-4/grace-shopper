import React, {Component} from 'react'
import {connect} from 'react-redux'
// import store from '../store'
import {fetchCategories} from '../store'
import {Grid, Image, Header} from 'semantic-ui-react'
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
            <Grid columns={4} divided>
            {
             categories.map(category => {
               return (
                       <Grid.Row key={category.id}>
                       <h2>{category.title} Boots</h2>
                       {
                        category.products.map(product =>{
                          return (
                                  <Grid.Column key={product.id}>
                                  <Image src={product.photo} alt="product photo" />
                                  <Header as='h3' content={product.title} />
                                  <Header as='h4' content={product.price} />
                                  </Grid.Column>
                                  )
                        })
                      }
                        </Grid.Row>
                      )
             })
           }
           </Grid>
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
