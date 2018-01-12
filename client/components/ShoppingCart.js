import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export function ShoppingCart (props) {
    return (
        <div>
            <ul>
                {props.cart.lineItems &&
                    props.cart.lineItems.map(lineItem => {
                        return (
                            <li key={lineItem.id}>{lineItem.productId}</li>
                        )
                    }
                )}
            </ul>
        </div>
    );
}

/**
 * CONTAINER
 */
const mapState = ({cart}) => ({cart})

export default connect(mapState)(ShoppingCart)
