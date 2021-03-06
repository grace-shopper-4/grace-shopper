import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store'
import { Image, Header, Card, Input } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import AddToCartButton from './AddToCartButton'

/**
 * COMPONENT
 */

 export class Products extends Component {
  constructor(props){
    super(props)
    this.state = {
      productSearch: '',
      filteredProducts: this.props.categories.products
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount(){
    this.props.createCategoryState()
  }

  handleChange(event){
    const search = event.target.value
    let filteredProducts = []
    this.props.categories.filter(category =>{
      category.products.filter(product =>{
        if (product.title.includes(search)) {
          filteredProducts.push(product)
        }
      })
    })
    this.setState({
      productSearch: search,
      filteredProducts: filteredProducts
    })
  }

  render(){

    const {categories} = this.props
    const {filteredProducts} = this.state
    return (
            <div>
              <Header as="h1"> All Products </Header>
            <div className="searchbar">
              <label>Find a Product:</label><Input onChange={this.handleChange} name="searchbar" placeholder="search" />
            </div>
            {
             categories.map(category => {
               return (
                       <div key={category.id}>
                       <Header as="h2">{category.title} Boots</Header>
                       <Card.Group itemsPerRow={4}>
                       {
                        category.products.filter(product => {
                          if (product.title.includes(this.state.productSearch)){
                            return true
                          }
                        }).map(product => {
                          return (

                                  <Card>
                                  <Link to={`/products/${product.id}`}>
                                  <Image src={product.photo} alt="product photo" />
                                  <Card.Content>
                                  <Card.Header className="categoryProductName">{product.title}</Card.Header>
                                  <Card.Header className="categoryProductPrice">${product.price / 100}</Card.Header>
                                  </Card.Content>
                                  </Link>
                                  <AddToCartButton product={product} />
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


const mapState = (state) => {
  return {
    categories: state.categories,

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
