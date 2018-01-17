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
        <Menu secondary className="nav-wrapper">

          <Menu.Item><Link className="logoTitle" to="/home">new boot goofin</Link></Menu.Item>
          <Dropdown text="categories" >
            <Dropdown.Menu>
              {
                    categories.map(category => {
                      return <Dropdown.Item key={category.id}><Link to={`/categories/${category.id}`}> {category.title} </Link></Dropdown.Item>
                    })
                  }
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Menu position="right" className="nav-options">
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
          </Menu.Menu>
        </Menu>
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
