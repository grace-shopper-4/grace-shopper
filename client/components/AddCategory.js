import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCategory } from '../store'
import { Link } from 'react-router-dom';

export class AddCategory extends Component {
  constructor(props) {
      super(props)
      this.state = {
        title: '',
        description: ''
      }

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeTitle = this.handleChangeTitle.bind(this);
      this.handleChangeDescription = this.handleChangeDescription.bind(this);
  }

  handleSubmit(event, state) {
      this.setState({title: '', description: ''})
      this.props.handleSubmit(event, state)
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleChangeDescription(event){
    this.setState({ description: event.target.value })
  }


  render() {
    return (
      <div>
        <form onSubmit={(event) => this.handleSubmit(event, this.state)}>
          <div>
            <fieldset>
              <legend>New Boot Category</legend>
              <div>
                <label>Title</label>
                <div>
                  <input
                    value={this.state.title}
                    type="text"
                    onChange={this.handleChangeTitle} />
                </div>
              </div>
              <div>
                <label>Description</label>
                <div>
                  <input
                    value={this.state.description}
                    type="text"
                    onChange={this.handleChangeDescription} />
                </div>
              </div>
              <div>
                <div>
                  <button
                    type="submit"
                    disabled={this.state.title.length ? false : true} >
                    Add Category
                  </button>
                </div>
              </div>
            </fieldset>
          </div>
        </form>


      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (event, state) => {
      event.preventDefault();
      dispatch(postCategory(state, ownProps.history))
  }
});

export default connect(null, mapDispatchToProps)(AddCategory)
