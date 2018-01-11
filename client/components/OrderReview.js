import React from 'react'
import {connect} from 'react-redux'
import {Form, Button} from 'semantic-ui-react'
//need to create
function OrderReview (props) {
  console.log(props.user)
  return (
         <div>
         <h2>Review Order</h2>

           <Form name="billingAddress">
              <Form.Field>
              <label>Billing Address</label>
              <input name="address" value={props.user.billingAddress} />
              </Form.Field>
              <Form.Field>
              <label>Shipping Address</label>
              <input name="address" value={props.user.shippingAddress} />
              </Form.Field>
              <Button type='submit'>Place Order</Button>
           </Form>
         </div>
         )
}

const mapState = (state) => {
  return {
    user: state.user
  };
}


// const mapDispatch = (dispatch) => {
//   return {
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
//   }
// }


export default connect(mapState)(OrderReview)

