import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import {fetchProducts} from '../store'

export class SearchBar extends Component {
  render() {
console.log(this.props)
    return(
           <input name="searchbar" placeholder="search" />
           )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
    return {
      getProducts: () =>{
        dispatch(fetchProducts())
      }
    }
}


export default connect(mapState, mapDispatch)(SearchBar)
