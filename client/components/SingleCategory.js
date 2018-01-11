import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchCategories } from '../store'
import { NavLink } from 'react-router-dom';

/**
 * COMPONENT
 */
export class SingleCategory extends Component {

    componentDidMount() {
        this.props.fetchAllCategories();
    }

    render() {
        let currentCategory = {};
        this.props.categories.forEach(category => {
            console.log(category.id === this.props.match.params.id)
            if (category.id === parseInt(this.props.match.params.id)) currentCategory = category;
        })
        console.log('current category: ', currentCategory)
        if (currentCategory === {}) return <div />
        return (
            <div>
                <h3>{currentCategory.title}</h3>
                <ul>
                    {currentCategory.products &&
                        currentCategory.products.map(product => {
                            console.log("reviews: ", product.reviews)
                            return (
                                <li key={product.id}>
                                    <NavLink to={`/products/${product.id}`}>
                                        <h5>{product.title}</h5>
                                        <img src={product.photo} />
                                        <h5> {`Average Rating: ${product.averageRating && product.averageRating}`} </h5>
                                        <h5> {`Based on ${product.numberOfReviews} reviews.`} </h5>
                                    </NavLink>
                                </li>
                            )
                    })}
                </ul>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = ({categories}) => ({categories})

const mapDispatch = dispatch => {
    return {
        fetchAllCategories: () => {
            dispatch(fetchCategories());
        }
    }
}


export default connect(mapState, mapDispatch)(SingleCategory)
