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
        let orderTotal = 0;
        if (this.props.cart.lineItems){
            if (this.props.cart.lineItems[0]){
                if (this.props.cart.lineItems[0].product){

                return (
                    <div>
                        <h3 id="cart-header">Your cart:</h3>
                        <table id="cart-list">
                            <thead>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th />
                            </thead>
                            <tbody>
                                {this.props.cart.lineItems &&
                                    this.props.cart.lineItems.map(lineItem => {
                                        orderTotal += lineItem.totalPrice;
                                        return (
                                            <tr key={lineItem.id}>
                                                <td>{lineItem.product.title}</td>
                                                <td>
                                                    <div>
                                                        <button className="cart-btns" onClick={() => {
                                                            if (lineItem.quantity > 1){
                                                                this.props.decrement(lineItem.orderId, lineItem.product)
                                                            } else {
                                                                this.props.removeLineItem(this.props.cart.id, lineItem.id)
                                                            }
                                                        }}>-</button> {/*make this*/}
                                                        <span id="qty-span">{lineItem.quantity}</span>
                                                        <button className="cart-btns" onClick={() => this.props.increment(lineItem.orderId, lineItem.product)}>+</button> {/*make this*/}
                                                    </div>
                                                </td>
                                                <td>{`$${(lineItem.totalPrice / 100).toFixed(2)}`}</td>
                                                <button className="cart-btns" onClick={() => {
                                                    this.props.removeLineItem(this.props.cart.id, lineItem.id)
                                                }}>X</button>
                                            </tr>
                                        )
                                    }
                                )}
                            </tbody>
                        </table>
                        <div id='order-total-box'>
                            <label id='order-total-label'>{`Order Total: $${(orderTotal / 100).toFixed(2)}`}</label>
                            <Link to={'/orderReview'}>
                                <button>Submit Order</button>
                            </Link>
                        </div>
                    </div>
                )
                } else {
                return <h2>Your cart is empty!</h2>
                }
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
