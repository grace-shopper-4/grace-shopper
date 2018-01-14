import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchOrder} from '../store'
import {Link} from 'react-router-dom';
import StarsRating from 'react-stars-rating';

export class SingleOrder extends Component {

     componentDidMount() {
         const orderId = this.props.id
         this.props.fetchOrder(orderId)
    }

    render() {
        let total = 0
        let singleOrder = this.props.singleOrder
        if(!singleOrder.lineItems) return <div/>
        if(singleOrder.userId !== this.props.user.id) return <div> <h1> ACCESS FORBIDDEN </h1> </div> //so you can't hit another user's orders via url
        return (
            <div>
      <h1> Order# : {singleOrder.id}</h1>
      <h1> Status : {singleOrder.status}</h1>
      <Link to = "/myAccount"><button> Back to My Account </button></Link>
      <form>
          {singleOrder.lineItems.map(lineItem => {
              total += lineItem.totalPrice
              return (
                  <div key = {lineItem.id}>
                  <img src = {lineItem.product.photo} />
                  <Link to = {`/products/${lineItem.product.id}`} ><h2>{lineItem.product.title}</h2></Link>
                  <h3> Product Price: ${lineItem.itemPrice}</h3>
                  <h3> Units Ordered: {lineItem.quantity}</h3>
                  <h3> Subtotal: ${lineItem.totalPrice}</h3>
                  </div>
              )
          })
        }
        <h3> Order Total:  ${total} </h3>
        </form>
          
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      user: state.user,
      id: parseInt(ownProps.match.params.id),
      singleOrder: state.singleOrder,
      categories: state.categories
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchOrder: (id) => {
      dispatch(fetchOrder(id))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)