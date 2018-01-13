import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, fetchCurrentOrder } from '../store'

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
          <img className="logo" src="/images/A boot.png" />
          <nav className="nav-menu">
            <ul className="clearfix">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Categories">Categories</Link>
                <ul className="sub-menu">
                  {
                    categories.map(category => {
                      return <li key={category.id}><Link to={`/Categories/${category.id}`}> {category.title} </Link></li>
                    })
                  }
                  <li><Link to="/products">All Boots</Link></li>
                </ul>
              </li>
            </ul>
          </nav>
          <Link to="/shoppingCart"><img className="cart" src="/images/cart.jpg" /></Link>
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
    }
  };
};

export default connect(mapState, mapDispatchToProps)(Navbar)
