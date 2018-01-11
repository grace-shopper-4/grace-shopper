import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../store'
import _ from 'lodash';


export class SingleProduct extends Component {

    componentDidMount() {
        this.props.fetchCategories()
    }
    render() {
        let currentProduct = {};
        this.props.categories.forEach(category => {
            category.products.forEach(product => {
                if (product.id === this.props.id) currentProduct = product;
            })    
        })
       
        if (!currentProduct) return <div />
        return (
            <div>
                <h1> {currentProduct.title}</h1>
                <h3> {currentProduct.description}</h3>
                <h4> {currentProduct.price}</h4>
                <h4> {currentProduct.photo}</h4>
                <h5> {`Average Rating: ${currentProduct.averageRating && currentProduct.averageRating}`} </h5>
                <h5> {`Based on ${currentProduct.numberOfReviews} reviews.`} </h5>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      id: parseInt(ownProps.match.params.id),
      categories: state.categories
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => {
      dispatch(fetchCategories())
    },
    setCurrentProduct: () => {
      dispatch(getProduct)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

