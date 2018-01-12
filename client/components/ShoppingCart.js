import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { deleteLineItem } from '../store'

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
                                    <div>{`Qty: ${lineItem.quantity}`}</div>
                                    <div>{`Total cost: ${lineItem.totalPrice}`}</div>
                                    <button onClick={() => {
                                        props.removeLineItem(props.cart.id, lineItem.id)
                                    }}>Remove Item</button>
                                </li>
                            )
                        }
                    )}
                </ul>
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
            dispatch(deleteLineItem(orderId, lineItemId));
        }
    }
}

export default connect(mapState, mapDispatch)(ShoppingCart)
