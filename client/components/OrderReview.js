import React from 'react'
import {connect} from 'react-redux'
import {updateOrderStatus, updateUser} from '../store'
import {Form, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

function OrderReview (props) {

  const {cart, user} = props
  const {lineItems} = cart
  if (!cart) return <div />
    if (!lineItems) return <div />
  return (
         <div>
         <h2>Review Order</h2>
             <Form name="shippingAddress" onSubmit={(event) => {props.updateAddress(user.id, event)}}>
              <Form.Field>
              <label>Shipping Address</label>
              <input onChange={props.handleChange} name="address"/>
              </Form.Field>
              <Button type='submit'>Save</Button>
           </Form>
                <form onSubmit={() => {props.submitOrder(cart.id)}}>
            {
              lineItems.map(lineItem =>{
                console.log(lineItem)
                return(
                <div key={lineItem.id}>
                <img src ={lineItem.product.photo} alt="product image" />
                <h2>{lineItem.product.title}</h2>
                <h3>{lineItem.itemPrice}</h3>
                <h3>{lineItem.quantity}</h3>
                <h3>{lineItem.totalPrice}</h3>
                </div>
                       )
              })
            }
                <Link to="/orderConfirmation" ><button type="submit">Submit Order</button></Link>
                </form>



         </div>
         )
}


const mapState = (state, ownProps) => {
  return {
    user: state.user,
    cart: state.cart
  };
}


 const mapDispatch = (dispatch) => {
   return {
     handleChange (event){
      console.log(event.target.value)
    },
    updateAddress (userId, event) {
      event.preventDefault();
      const address = {
        shippingAddress: event.target.address.value,
      };
      dispatch(updateUser(userId, address))
    },
      submitOrder(orderId) {
        const order = {
        status: "Processing"
      };
        dispatch(updateOrderStatus(orderId, order))
      }
   }
}


export default connect(mapState, mapDispatch)(OrderReview)

