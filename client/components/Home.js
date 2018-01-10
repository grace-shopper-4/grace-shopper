import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchCategories} from '../store'

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
      <div>
        <h3>Boot Party</h3>
        <div>{'<Cool video thing will go here>'}</div>
        <br/>
        {categories.map(category => {
          return (
            <div key={category.id}>
              <NavLink to={`/categories/${category.id}`}>{category.title}</NavLink>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Oxhide_boots._Loulan%2C_Xinjiang._Early_Han_220_BCE_-_8_CE.jpg/220px-Oxhide_boots._Loulan%2C_Xinjiang._Early_Han_220_BCE_-_8_CE.jpg" />
            </div>
          )
        })}
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

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
