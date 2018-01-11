import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store'
import _ from 'lodash';


export class SingleProduct extends Component {

    componentDidMount() {
        this.props.fetchProducts()

    }
    render() {
        const product = this.props.products.find(aProduct => {
            return aProduct.id === this.props.id})
       
        if (!product) return <div />
        return (
            <div>
                <h1> {product.title}</h1>
                <h3> {product.description}</h3>
                <h4> {product.price}</h4>
                <h4> {product.photo}</h4>
                <h5> Reviews on Props as Well </h5>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      id: parseInt(ownProps.match.params.id),
      products: state.products
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchProducts: () => {
      dispatch(fetchProducts())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

