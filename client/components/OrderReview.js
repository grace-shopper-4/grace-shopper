import React from 'react'
import {connect} from 'react-redux'
import {updateOrderStatus} from '../store'
import {Form, Button} from 'semantic-ui-react'

function OrderReview (props) {
  return (
         <div>
         <h2>Review Order</h2>
           <Form name="billingAddress">
              <Form.Field>
              <label>Billing Address</label>
              <input name="address" value={props.user.billingAddress} />
              </Form.Field>
              <Button type='submit'>Save</Button>
            </Form>
             <Form name="shippingAddress">
              <Form.Field>
              <label>Shipping Address</label>
              <input name="address" value={props.user.shippingAddress} />
              </Form.Field>
              <Button type='submit'>Save</Button>
           </Form>

              <img src={this.props.users.orders.lineItems.product.photo}  alt="product image" />
              <p>{this.props.users.orders.lineItems.product.title}</p>
              <p>{this.props.users.orders.lineItems.quantity}</p>
              <p>{this.props.users.orders.lineItems.price}</p>

            <Button onClick={this.props.handleUpdate} type='submit'>Submit Order</Button>
         </div>
         )
}

const mapState = (state, ownProps) => {
  return {
    user: state.user,
  };
}


 const mapDispatch = (dispatch) => {
   return {
//      handleChange (event){
//       console.log(event.target.value)
//     },
//     submitNewStudent (event) {
//       var campusId = Number(event.target.campusId.value)
//       event.preventDefault();
//       const address = {
//         billingAddress: event.target.billingAddress.value,
//         shippingAddress: event.target.shippingAddress.value,
//       };
//       // dispatch(postStudent(student))
//     }
      handleUpdate(orderId) {
        dispatch(updateOrderStatus(orderId))
      }
   }
}


export default connect(mapState, mapDispatch)(OrderReview)

