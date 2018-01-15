import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class OrderConfirmation extends Component {

  render() {
    let user = this.props.user
    let cart = this.props.cart
    console.log(cart)
    return (
      <div id="container">
        {
          user.isGuest ?
            <div>
              <h1>Thank you for your order</h1>
              <p>Your order number is {cart.id}</p>
            </div>
            :
            <div>
              <h1>Thank you for your order {user.name}</h1>
              <p>Your order number is {cart.id}</p>
            </div>
        }
      </div>
    )
  }
}

const mapState = ({ cart, user }) => {
  return {
    cart,
    user
  }
}

export default connect(mapState)(OrderConfirmation)
