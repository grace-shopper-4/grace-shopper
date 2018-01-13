import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { deleteLineItem, updateLineItem } from '../store'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
export function ShoppingCart (props) {
    if (props.cart){
        return (
            <div>
                <ul>
                    {props.cart.lineItems &&
                        props.cart.lineItems.map(lineItem => {
                            return (
                                <li key={lineItem.id}>
                                    <div>{lineItem.product.title}</div>
                                    <div>
                                        <button onClick={() => {
                                            if (lineItem.quantity > 1){
                                                props.decrement(lineItem.orderId, lineItem.product)
                                            } else {
                                                props.removeLineItem(props.cart.id, lineItem.id)
                                            }
                                        }}>-</button> {/*make this*/}
                                        <span>{`Qty: ${lineItem.quantity}`}</span>
                                        <button onClick={() => props.increment(lineItem.orderId, lineItem.product)}>+</button> {/*make this*/}
                                    </div>
                                    <div>{`Total cost: ${lineItem.totalPrice}`}</div>
                                    <button onClick={() => {
                                        props.removeLineItem(props.cart.id, lineItem.id)
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
        return null;
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
        }
    }
}

export default connect(mapState, mapDispatch)(ShoppingCart)
