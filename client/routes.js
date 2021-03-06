import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'

import {Main,
        Login,
        Signup,
        Home,
        MyAccount,
        Products,
        SingleProduct,
        SingleOrder,
        SingleCategory,
        OrderReview,
        OrderConfirmation,
        AddCategory,
        ShoppingCart} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props
    console.log('addcategory', AddCategory)
    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/categories/:id" component={SingleCategory} />
            <Route path="/shoppingCart" component={ShoppingCart} />
            <Route path="/orderReview" component={OrderReview} />
            <Route path="/orderConfirmation" component={OrderConfirmation} />
            <Route path="/orders/:id" component={SingleOrder} />
            <Route path="/new" component={AddCategory} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/myAccount" component={MyAccount} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Home} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
