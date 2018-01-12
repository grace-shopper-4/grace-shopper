import React, { Component } from 'react';
import { connect } from 'react-redux';
import { me, fetchCategories, postReview, fetchOrder } from '../store'
import _ from 'lodash';
import StarsRating from 'react-stars-rating';

export class MyAccount extends Component {
    
        componentDidMount() {
          this.props.fetchOrder(this.props.user.id)

    
        }
        render() {
         

           
          
            return (

                <div>
    
                <h1> {console.log("hihihi", this.props)}{this.props.user.email}</h1>
                <h1> {this.props.user.name}</h1>
                <h1> {this.props.billingAdress}</h1>
                <h1> {this.props.shippingAdress}</h1>
        
                </div>)
    
            }
        
    }

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
      id: parseInt(ownProps.match.params.id),
      categories: state.categories, 
      order: state.cart,
    }
};




const mapDispatchToProps = (dispatch) => ({
    fetchOrder: (id) => {
      dispatch(fetchOrder(id))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)

