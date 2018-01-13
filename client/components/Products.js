import React, {Component} from 'react'
import {connect} from 'react-redux'
// import store from '../store'
import {fetchCategories} from '../store'
import {Grid, Image, Header, Card} from 'semantic-ui-react'
/**
 * COMPONENT
 */



  // submitSearch = (event) => {
  //   event.preventDefault();
  //   const {products} = this.props
  //   products.forEach(product =>{
  //     if (product.title.includes(event.target.searchbar.value)){
  //       console.log(product.title)
  //       this.props.submitSearch(product)
  //     }
  //   })
  // }

 export class Products extends Component {
  constructor(){
    super()
    this.state = {
      product: []
    }
  }


  componentDidMount(){
    this.props.createCategoryState()
  }

  handleChange = (event) => {
    const {categories} = this.props
    categories.filter(category =>{
      category.products.filter(product=>{
        if (product.title.includes(event.target.value)){
          this.setState({
            product
          })
        }
      })
    })
  }

  render(){
    console.log(this.state.product)
    const {categories} = this.props
    if (!this.state.product){
    return (
            <div>
            <Header as="h1"> All Products </Header>
            <form onSubmit={this.submitSearch}>
              <input name="searchbar" placeholder="search" />
              <button type="submit">search</button>
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
                                  <Image src={product.photo} alt="product photo" />
                                   <Card.Content>
                                  <Card.Header className="categoryProductName">{product.title}</Card.Header>
                                  <Card.Header className="categoryProductPrice">${product.price}</Card.Header>
                                  </Card.Content>
                                  </Card>
                                  )
                        })
                      }
                      </Card.Group>
                      </div>
                      )
             })
           }
           </form>
           </div>
           )
    } else {

    }
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
