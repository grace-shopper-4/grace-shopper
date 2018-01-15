import React, { Component } from 'react'
import {connect} from 'react-redux'
import { createNewOrder, updateLineItem, addLineItem } from '../store'

/**
 * COMPONENT
 */
export class AddToCartButton extends Component {
    render() {
        let product = this.props.product;
        let user = this.props.user;
        let cart = this.props.cart;
        if (!cart) {
            return (
                <button onClick={event => {
                    this.props.startNewCart(product, user)
                }}>Add to Cart</button>
            )
        } 
        else {
            return (
                <div>
                    <button onClick={event => {
                        let addItemAlert = document.getElementById(`add-item-alert-${product.id}`)
                        addItemAlert.classList.remove('hidden')
                        setTimeout(() => {
                            addItemAlert.classList.add('hidden')
                        }, 500);

                        let lineItemId;
                        cart.lineItems.forEach(lineItem => {
                            if (lineItem.productId === product.id) lineItemId = lineItem.id;
                        })
                        if (lineItemId) { 
                            this.props.incrementItem(cart.id, product) 
                        }
                        else { this.props.addNewItem(cart.id, product) }
                    }}>Add to Cart</button>
                    <span id={`add-item-alert-${product.id}`} className="add-item-alert hidden">Item added to cart!</span>
                </div>
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
        user: state.user,
        product: ownProps.product
    }
}

const mapDispatch = dispatch => {
    return {
        startNewCart: (product, user) => {
            dispatch(createNewOrder(product, user));
        },
        incrementItem: (orderId, product) => {
            dispatch(updateLineItem(orderId, product, 1));
        },
        addNewItem: (orderId, product) => {
            dispatch(addLineItem(orderId, product))
        }
    }
}

export default connect(mapState, mapDispatch)(AddToCartButton)
