import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, postReview, fetchProduct, removeProduct } from '../store'
import _ from 'lodash';
import StarsRating from 'react-stars-rating';

export class SingleProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
        }
        this.handleDeleteProduct = this.handleDeleteProduct.bind(this)     
    }

     componentDidMount() {
         this.props.fetchCategories()
         this.props.setCurrentProduct(this.props.id)
    }

    handleDeleteProduct(e){
        this.props.removeProduct({id: this.props.id, catId: this.props.product.categoryId})
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
        let categoryId = this.props.product.categoryId
        console.log('props', categoryId)
        let id = this.props.id
        let admin = this.props.isAdmin
        let currentProduct = {};
        this.props.categories.forEach(category => {
            category.products.forEach(product => {
                if (product.id === this.props.id) currentProduct = product;
            })
        })
        const {reviews} = currentProduct
        if (!reviews) return <div />
        if (!currentProduct) return <div />
        return (
            <div>
            <div>
                <h1> {currentProduct.title}</h1>
                <h3> {currentProduct.description}</h3>
                <h4> {currentProduct.price}</h4>
                <h4> {currentProduct.photo}</h4>
                <h5> {`Average Rating: ${currentProduct.averageRating && currentProduct.averageRating}`} </h5>
                <h5> {`Based on ${currentProduct.numberOfReviews} reviews.`} </h5>
            </div>
            {admin && 
            <button onClick = {this.handleDeleteProduct}> Delete Product </button>
            }


            <div>
                <h1>Reviews</h1>
                {
                reviews.map(review =>{
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
      userId: state.user.id,
      id: parseInt(ownProps.match.params.id),
      categories: state.categories,
      products: state.products,
      product: state.singleproduct
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => {
      dispatch(fetchCategories())
    },
    setCurrentProduct: (id) => {
      dispatch(fetchProduct(id))
    },
    submitReview: (newReview) => {
        dispatch(postReview(newReview))
    },
    removeProduct: (id) => {
        dispatch(removeProduct(id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

