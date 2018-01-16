import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, postReview, fetchReviews, fetchProduct, removedProduct, fetchProducts, updateProduct } from '../store'
import _ from 'lodash';
import StarsRating from 'react-stars-rating';
import { Image, Header, Accordion, Icon, Container, Item, Button } from 'semantic-ui-react'
import history from "../history"
import AddToCartButton from './AddToCartButton'

export class SingleProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            editProductAccordionOpen: false
        }

        this.handleDelete = this.handleDelete.bind(this)
        this.handleTitle = this.handleTitle.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleInventory = this.handleInventory.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.toggleEditProduct = this.toggleEditProduct.bind(this);
        this.submitReview = this.submitReview.bind(this)
    }

    componentDidMount() {
     if (this.props.isAdmin){
      this.props.fetchProducts()
    }
    this.props.fetchCategories()
    this.props.setCurrentProduct(this.props.id)


    this.props.getReviews()
}

handleDelete(e){
    this.props.removedProduct(this.props.id)
    setTimeout(function() {
        history.push('/products')
    }, 10)
}

toggleEditProduct() {
    this.setState({editProductAccordionOpen: !this.state.editProductAccordionOpen})
}

handleTitle(event) {

    this.setState({
        product: { ...this.state.product, title: event.target.value }
    })
}
handlePrice(event) {
    this.setState({
        product: { ...this.state.product, price: event.target.value }
    })
}
handleInventory(event) {
    this.setState({
        product: { ...this.state.product, inventory: event.target.value }
    })

}
handlePhoto(event) {
    this.setState({
        product: { ...this.state.product, photo: event.target.value }
    })
}
handleDescription(event) {
    this.setState({
        product: { ...this.state.product, description: event.target.value }
    })
}
handleCategory(event) {
    this.setState({
        product: { ...this.state.product, categoryId: event.target.value}
    })
}

handleSubmit(event) {
    event.preventDefault();
    const updatedProduct = this.state.product;
    this.props.updateProduct(this.props.id, updatedProduct)
    this.forceUpdate()
}

handleChange = (event) => {
  console.log(event.target.value)
}

submitReview = (event) => {
  event.preventDefault();
  let userId = this.props.userId
  const review = {
    title: event.target.title.value,
    content: event.target.content.value,
    stars: event.target.stars.value,
    productId: this.props.id,
    userId: userId
};
this.props.createReview(userId, review)
}
onRatingClick = (rating) =>{
    return true
}

render() {
    let categoryId = this.props.product.categoryId
    let id = this.props.id
    let admin = this.props.isAdmin
    let currentProduct = {};
    this.props.categories.forEach(category => {
        category.products.forEach(product => {
            if (product.id === this.props.id) currentProduct = product;
        })
    })

    const { reviews } = this.props


        if (!reviews) return <div />
        if (Object.keys(currentProduct).length < 1) return <div />
                return (
                        <div>
                        {admin && (
                                    <div>
                                        <Accordion>
                                            <Accordion.Title active={this.state.editProductAccordionOpen} onClick={this.toggleEditProduct}>
                                                Edit Product
                                                <Icon name="dropdown" />
                                            </Accordion.Title>
                                            <Accordion.Content active={this.state.editProductAccordionOpen}>
                                                <form onSubmit={this.handleSubmit} >
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="Title"
                                                            placeholder="Enter Title"
                                                            onChange={this.handleTitle}

                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="Price"
                                                            placeholder="Enter Price"
                                                            onChange={this.handlePrice}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input

                                                            type="text"
                                                            name="Inventory"
                                                            placeholder="Enter Inventory"
                                                            onChange={this.handleInventory}

                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="Photo"
                                                            placeholder="Enter Photo"
                                                            onChange={this.handlePhoto}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="Description"
                                                            placeholder="Enter Description"
                                                            onChange={this.handleDescription}
                                                        />
                                                    </div>
                                                    <div>
                                                        <select name="Category" onChange={this.handleCategory}>
                                                            <option disabled selected>Choose Category</option>
                                                            {this.props.categories.map(category => {
                                                                return (
                                                                    <option value={`${category.id}`} key={category.id}>
                                                                        {category.title}
                                                                    </option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <span>
                                                        <button type="submit">Submit</button>
                                                    </span>
                                                </form>
                                                <button onClick={this.handleDelete}> Delete Product </button>
                                            </Accordion.Content>
                                        </Accordion>
                                    </div>
                                )}
                        <Container className="singleProduct">
                        <Item.Group divided>
                            <Item>
                                <Item.Image src={this.props.product.photo} alt="product photo" />
                                <Item.Content>
                                    <Item.Header as="h1"> {this.props.product.title}</Item.Header>
                                    <Item.Description>{this.props.product.description}</Item.Description>
                                    <Item.Meta>
                                        <span>Average Rating: </span><StarsRating rating={currentProduct.averageRating && currentProduct.averageRating} />
                                        <span> {`Average Rating: ${currentProduct.averageRating && currentProduct.averageRating}`} </span>
                                        <span> {`Based on ${currentProduct.numberOfReviews} reviews.`} </span>
                                    </Item.Meta>
                                    <Item.Extra> {`$${this.props.product.price / 100}`}</Item.Extra>
                                    <AddToCartButton product={this.props.product} />
                                </Item.Content>
                            </Item>
                        </Item.Group>
                        </Container>
                        <div>
                        <h1>Reviews</h1>
                        {
                            reviews.filter(review => {
                              if (review.productId === currentProduct.id){

                                return true
                            }
                        }).map(review =>{
                            return (
                                    <div key={review.id}>
                                    <h2>{review.title}</h2>
                                    <h3>{review.content}</h3>
                                    <StarsRating rating={review.stars} />
                                    </div>
                                    )
                        })
                    }
                    <h1>Add A Review</h1>
                    <form onSubmit={this.submitReview}>
                    <input onChange={this.handleChange} name="title" type="text" placeholder="review title" />
                    <input onChange={this.handleChange} name="content" type="text" placeholder="review content" />
                    <StarsRating insideForm={true} name="stars" rating={0} onClick={this.onRatingClick()} />
                    <button type="submit">Submit</button>
                    </form>
                    </div>
                    </div>
                    )
}


}

const mapStateToProps = (state, ownProps) => {
    return {

      isAdmin: state.user.isAdmin,
      user: state.user,
      userId: state.user.id,
      id: parseInt(ownProps.match.params.id),
      categories: state.categories,
      products: state.products,
      product: state.singleproduct,
      reviews: state.reviews
  }
};

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => {

      dispatch(fetchCategories())
  },
  getReviews: () => {
    dispatch(fetchReviews())
},
setCurrentProduct: (id) => {
  dispatch(fetchProduct(id))
},
createReview: (id, newReview) => {
    dispatch(postReview(id, newReview))
},
removedProduct: (id) => {
    dispatch(removedProduct(id))
},
fetchProducts: (id) => {
    dispatch(fetchProducts(id))
},
updateProduct: (id, updatedProduct) => {
    dispatch(updateProduct(id, updatedProduct))
}
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

