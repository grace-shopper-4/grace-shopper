import React, { Component } from 'react'
import axios from 'axios';
import { Link, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store'




class Navbar extends Component {

  render() {
    let user = this.props.user;
    return (
      <div>
        <div className="nav-wrapper">
          <img className="logo" src="/images/A boot.png" />
          <nav className="nav-menu">
            <ul className="clearfix">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Categories">Categories</Link>
                <ul className="sub-menu">
                  <li><Link to="/Categories/party">Party</Link></li>
                  <li><Link to="/Categories/rain">Rain</Link></li>
                  <li><Link to="/Categories/cowboy">Cowboy</Link></li>
                  <li><Link to="/products">All Boots</Link></li>
                </ul>
              </li>
            </ul>
          </nav>
          <Link to="/cart"><img className="cart" src="/images/cart.jpg" /></Link>
          {
            user.isGuest ?
            <div>
              <Link to="/login"><button>Log In</button></Link>
              <Link to="/signup"><button>Sign Up</button></Link>
            </div>
            :
            <Link to="/logout"><button onClick={ this.props.onClickLogout }>Log Out</button></Link>
          }

          <p>Welcome {user.name}</p>
        </div>

      </div>
    )
  }
}

const mapState = ({ user }) => {
  return {
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickLogout: () => {
      console.log('it was clicked')
      dispatch(logout())
    }
  };
};

export default connect(mapState, mapDispatchToProps)(Navbar)
