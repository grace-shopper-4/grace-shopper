import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { deleteLineItem, updateLineItem, fetchCurrentOrder } from '../store'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
export class ShoppingCart extends Component {

    componentDidMount() {
        this.props.fetchCart()
    }

    render() {
        console.log('lineitems:', this.props.cart.lineItems)
        if (this.props.cart.lineItems){
            if (this.props.cart.lineItems[0]){
                return (
                    <div>
                        <ul>
                            {this.props.cart.lineItems &&
                                this.props.cart.lineItems.map(lineItem => {
                                    return (
                                        <li key={lineItem.id}>
                                            <div>{lineItem.product.title}</div>
                                            <div>
                                                <button onClick={() => {
                                                    if (lineItem.quantity > 1){
                                                        this.props.decrement(lineItem.orderId, lineItem.product)
                                                    } else {
                                                        this.props.removeLineItem(this.props.cart.id, lineItem.id)
                                                    }
                                                }}>-</button> {/*make this*/}
                                                <span>{`Qty: ${lineItem.quantity}`}</span>
                                                <button onClick={() => this.props.increment(lineItem.orderId, lineItem.product)}>+</button> {/*make this*/}
                                            </div>
                                            <div>{`Total cost: ${lineItem.totalPrice}`}</div>
                                            <button onClick={() => {
                                                this.props.removeLineItem(this.props.cart.id, lineItem.id)
                                            }}>Remove Item</button>
                                        </li>
                                    )
                                }
                            )}
                        </ul>
                        <Link to={'/orderReview'}>
                            <button>Submit Order</button>
                        </Link>
                    </div>
                )
            } else {
                return <h2>Your cart is empty!</h2>
            }
        } else {
            return (
                <h2>Your cart is empty!</h2>
            );
        }
    }
}

/**
 * CONTAINER
 */
const mapState = ({cart}) => ({cart})

const mapDispatch = () => dispatch => {
    return {
        removeLineItem: (orderId, lineItemId) => {
            dispatch(deleteLineItem(orderId, lineItemId))
        },
        increment: (orderId, product) => {
            dispatch(updateLineItem(orderId, product, 1))
        },
        decrement: (orderId, product) => {
            dispatch(updateLineItem(orderId, product, -1))
        },
        fetchCart: () => {
            dispatch(fetchCurrentOrder())
        }
    }
}

export default connect(mapState, mapDispatch)(ShoppingCart)
