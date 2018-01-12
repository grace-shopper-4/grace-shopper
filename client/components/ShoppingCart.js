import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export function ShoppingCart (props) {
    console.log('cart: ', props.cart)
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

export default connect(mapState)(ShoppingCart)
