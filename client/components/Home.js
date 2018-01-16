import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchCategories} from '../store'
import axios from 'axios'

/**
 * COMPONENT
 */
export class Home extends Component {
  componentDidMount() {
    this.props.setAllCategoriesOnState();
  }

  render() {
    const categories = this.props.categories;
    return (
      <div id="home-page">
        <div className="home-page-container">
          <video src="../videos/Reno 911 New boot goofin.mp4" autoPlay muted loop />
          <br />
          <div id="category-list">
            {categories.map(category => {
              return (
                <div key={category.id} className="category-box">
                  <NavLink to={`/categories/${category.id}`}>{category.title}</NavLink>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Oxhide_boots._Loulan%2C_Xinjiang._Early_Han_220_BCE_-_8_CE.jpg/220px-Oxhide_boots._Loulan%2C_Xinjiang._Early_Han_220_BCE_-_8_CE.jpg" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
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
