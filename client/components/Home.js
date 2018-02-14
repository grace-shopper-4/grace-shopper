import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchCategories} from '../store'
import axios from 'axios'
import {Parallax} from 'react-parallax'

/**
 * COMPONENT
 */
export class Home extends Component {
  componentDidMount() {
    this.props.setAllCategoriesOnState();
    // const backgroundColors = ['hotpink', 'pink', 'palevioletred', 'purple', 'violet'];
    // let i = 0;
    // this.interval = setInterval(() => {
    //   let homePageBackground = document.getElementById('home-page');
    //   homePageBackground.classList = '';
    //   homePageBackground.classList.add(`${backgroundColors[i]}`);
    //   i = (i+1) % 4;
    // }, 300);
  }

  render() {
    const textStyles = {background: 'none', padding: 20, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: "white", fontSize: '10em'};
    const categories = this.props.categories;
    return (
    <Parallax
      bgImage="https://images.unsplash.com/photo-1476041583396-e91e78267fb8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=179e8322bc33324941677517ea2a09c5&auto=format&fit=crop&w=1950&q=80"
      bgImageAlt="home"
      strength={200}
    >
      <div style={{ height: '100vh' }}>
      <div  style={textStyles}>
      <h1 className="landing-header">Welcome</h1>
      </div>
      </div>
    </Parallax>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({categories}) => ({categories})

const mapDispatch = dispatch => {
  return {
    setAllCategoriesOnState() {
      dispatch(fetchCategories());
    }
  }
}

export default connect(mapState, mapDispatch)(Home)

// const backgroundColors = ['hotpink', 'pink', 'palevioletred', 'purple', 'violet'];
// let i = 0;
// setInterval(() => {
//   let homePageBackground = document.getElementById('home-page');
//   homePageBackground.classList = [];
//   homePageBackground.classList.add(`${backgroundColors[i]}`);
//   i = (i+1) % 4;
// }, 300);

