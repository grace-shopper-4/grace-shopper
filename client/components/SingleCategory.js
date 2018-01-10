import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchCategory, fetchProducts } from '../store'
import { NavLink } from 'react-router-dom';

/**
 * COMPONENT
 */
export class SingleCategory extends Component {

    componentDidMount() {
        this.props.setCurrentCategory(this.props.match.params.id);
        this.props.setAllProducts();
    }
    
    render() {
        console.log('props: ', this.props)
        console.log('params id: ', this.props.match.params.id)
        const category = this.props.singleCategory;
        const products = this.props.products.filter(product => product.categoryId === category.id)
        return (
            <div>
                <h3>{category.title}</h3>
                <ul>
                    {products.map(product => {
                        return (
                            <li key={product.id}>{product.title}</li>
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
const mapState = ({singleCategory, products}) => ({singleCategory, products})

const mapDispatch = dispatch => {
    return {
        setCurrentCategory: (id) => {
            dispatch(fetchCategory(id));
        },
        setAllProducts: () => {
            dispatch(fetchProducts());
        }
    }
}


export default connect(mapState, mapDispatch)(SingleCategory)