import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCategories, postReview, fetchProduct, removeProduct, fetchProducts, updateProduct } from '../store'

import _ from 'lodash';
import StarsRating from 'react-stars-rating';
import {Grid, Image, Header, Card} from 'semantic-ui-react'

export class SingleProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {}
        }

        this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
        this.handleDelete = this.handleDelete.bind(this)  
        this.handleTitle = this.handleTitle.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleInventory = this.handleInventory.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       

    }

     componentDidMount() {
         if(this.props.isAdmin){
            this.props.fetchProducts()
         }
         this.props.fetchCategories()
         this.props.setCurrentProduct(this.props.id)

         this.props.getReviews()
    }

    handleDelete(e){
        this.props.removeProduct({id: this.props.id, catId: this.props.product.categoryId})
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
    handleSubmit(event) {
        event.preventDefault();
         const updatedProduct = this.state.product;
        this.props.updateProduct(this.props.id, updatedProduct)
    }

    handleChange = (event) => {
      console.log(event.target.value)
    }

    submitReview = (event) => {
      event.preventDefault();
      const review = {
        title: event.target.title.value,
        content: event.target.content.value,
        stars: event.target.stars.value,
        productId: this.props.id,
        userId: this.props.userId
      };
      this.props.submitReview(review)
    }
    onRatingClick = (rating) =>{
        return true
    }

    render() {
        console.log(this.props)
        let categoryId = this.props.product.categoryId
        let id = this.props.id
        let admin = this.props.isAdmin
        let currentProduct = {};
        this.props.categories.forEach(category => {
            category.products.forEach(product => {
                if (product.id === this.props.id) currentProduct = product;
            })
        })

        const {reviews} = this.props

        if (!reviews) return <div />
        if (!currentProduct) return <div />
        return (
            <div>
            <div>
                <h1> {this.props.product.title}</h1>
                <h3> {this.props.product.description}</h3>
                <h4> {this.props.product.price}</h4>
                <Image src={this.props.product.photo} alt="product photo" />
                <h5> {`Average Rating: ${currentProduct.averageRating && currentProduct.averageRating}`} </h5>
                <h5> {`Based on ${currentProduct.numberOfReviews} reviews.`} </h5>
            </div>
            {admin && 
            <div>
                <div>
            <button onClick = {this.handleDeleteProduct}> Delete Product </button>
            </div>
            <div>
            <h4> Edit Product </h4>
            <form onSubmit={this.handleSubmit} >
            <div>
                <input
                    type="text"
                    name="Title"
                    placeholder="Enter Title"
                    onChange = {this.handleTitle}
                    
                />
            </div>
            <div>
                <input
                    type="text"
                    name="Price"
                    placeholder="Enter Price"
                    onChange = {this.handlePrice}
                />
            </div>
            <div>
                <input
                   
                    type="text"
                    name="Inventory"
                    placeholder="Enter Inventory"
                    onChange = {this.handleInventory}
                 
                />
            </div>
            <div>
                <input
                    type="text"
                    name="Photo"
                    placeholder="Enter Photo"
                    onChange = {this.handlePhoto}
                />
            </div>
            <div>
                <input
                    type="text"
                    name="Description"
                    placeholder="Enter Description"
                    onChange = {this.handleDescription}
                />
            </div>
            <span>
                <button type="submit">Submit</button>
            </span>
        </form>
        </div>
        </div>
            }
            <div>
                <h1>Reviews</h1>
                {
                        reviews.filter(review => {
                          if (review.productId === currentProduct.id){
                            console.log(review)
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
    submitReview: (newReview) => {
        dispatch(postReview(newReview))
    },
    removeProduct: (id) => {
        dispatch(removeProduct(id))
    },
    fetchProducts: (id) => {
        dispatch(fetchProducts(id))
    },
    updateProduct: (id, updatedProduct) => {
        dispatch(updateProduct(id, updatedProduct))
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

