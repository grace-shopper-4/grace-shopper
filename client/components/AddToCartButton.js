import React, { Component } from 'react'
import {connect} from 'react-redux'
import { createNewOrder, updateLineItem, addLineItem } from '../store'

/**
 * COMPONENT
 */
export class AddToCartButton extends Component {
    render() {
        let product = this.props.product;
        let cart = this.props.cart;
        console.log('cart ', cart)
        if (!cart) {
            return (
                <button onClick={() => {
                    this.props.startNewCart(product)
                }}>Add to Cart</button>
            )
        } 
        else {
            return (
                <button onClick={() => {
                    let lineItemId;
                    cart.lineItems.forEach(lineItem => {
                        if (lineItem.productId === product.id) lineItemId = lineItem.id;
                    })
                    if (lineItemId) { 
                        this.props.incrementItems(cart.id, product) 
                    }
                    else { this.props.addNewItem(cart.id, product) }
                }}>Add to Cart</button>
            )
        }
    }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
    return {
        cart: state.cart,
        product: ownProps.product
    }
}

const mapDispatch = dispatch => {
    return {
        startNewCart: (product) => {
            dispatch(createNewOrder(product));
        },
        incrementItems: (orderId, product) => {
            dispatch(updateLineItem(orderId, product));
        },
        addNewItem: (orderId, product) => {
            dispatch(addLineItem(orderId, product))
        }
    }
}

export default connect(mapState, mapDispatch)(AddToCartButton)
