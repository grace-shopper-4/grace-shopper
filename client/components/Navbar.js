import React, { Component } from 'react'
import axios from 'axios';
import { Link, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, fetchCurrentOrder, getCurrentOrder } from '../store'
import { Button, Dropdown, Icon, Menu, Segment } from 'semantic-ui-react'

class Navbar extends Component {

  componentDidMount() {
    this.props.fetchSessionOrder();
  }

  render() {
    let user = this.props.user;
    let categories = this.props.categories

    return (
     <div>
        <div className="nav-wrapper">
          <nav className="nav-menu">
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li>{`Categories +`}
                <ul className="sub-menu">
                  {
                    categories.map(category => {
                      return <li key={category.id}><Link to={`/categories/${category.id}`}> {category.title} </Link></li>
                    })
                  }
                  <li><Link to="/products">All Boots</Link></li>
                </ul>
              </li>
            </ul>
          </nav>
          <div className="nav-options">
            <div className="nav-user-info">
              <p>Welcome, {user.name}!</p>
              {
                user.isGuest ?
                <div>
                  <Link to="/login"><Button>Log In</Button></Link>
                  <Link to="/signup"><Button>Sign Up</Button></Link>
                </div>
                :
                <div>
                  <Link to="/myAccount"><Button>My Account</Button></Link>
                  <Link to="/logout"><Button onClick={ () => {
                  this.props.onClickLogout();
                  this.props.clearCart();
                }}>Log Out</Button></Link>
                </div>
              }
            </div>
            <Link to="/shoppingCart"><img className="cart" src="/icons/iconmonstr-shopping-cart-8.svg" /></Link>
          </div>

        </div>

      </div>

    )
  }
}

const mapState = ({ user, categories }) => {
  return {
    user,
    categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickLogout: () => {
      console.log('it was clicked')
      dispatch(logout())
    },
    fetchSessionOrder: () => {
      dispatch(fetchCurrentOrder());
    },
    clearCart: () => {
      dispatch(getCurrentOrder({}))
    }
  };
};

export default connect(mapState, mapDispatchToProps)(Navbar)
