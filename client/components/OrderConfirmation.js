import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../store'


class OrderConfirmation extends Component {


  componentDidMount(){
    this.props.fetchingProducts()
  }

  render() {
    let products = this.props.products
    console.log('products', this.props)
    return (
      <div>
        <h1>Confirmation</h1>

      </div>
    )
  }
}

const mapState = ({ products }) => {
  return {
    products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingProducts: () => {
      console.log('it was clicked')
      dispatch(fetchProducts())
    }
  };
};

export default connect(mapState, mapDispatchToProps)(OrderConfirmation)
