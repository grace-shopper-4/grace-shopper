import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCategory } from '../store'
import { Link } from 'react-router-dom';
import { Image, Header, Accordion, Icon, Container, Item, Button, Form, Grid } from 'semantic-ui-react'

export class AddCategory extends Component {
  constructor(props) {
      super(props)
      this.state = {
        title: '',
        description: '',
        addCategoryAccordionOpen: false
      }

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeTitle = this.handleChangeTitle.bind(this);
      this.handleChangeDescription = this.handleChangeDescription.bind(this);
      this.toggleAddCategory = this.toggleAddCategory.bind(this);
  }

  toggleAddCategory() {
    this.setState({ addCategoryAccordionOpen: !this.state.addCategoryAccordionOpen })
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
         <Accordion>
                    <Accordion.Title active={this.state.addCategoryAccordianOpen} onClick={this.toggleAddCategory}>
                        New Category
                    <Icon name="dropdown" />
                    </Accordion.Title>
                    <Accordion.Content active={this.state.addCategoryAccordionOpen}>
                        <Container>
                            <Grid>
                                <Grid.Row left>
                                    <Grid.Column width={16}>
                                        <Form onSubmit={(event, result) => this.handleSubmit(event, this.state)}>
                                            <Form.Group>
                                                <Form.Input required
                                                    label="Title" onChange={this.handleChangeTitle} name="Title" placeholder='Title' width={6} />
                                                <Form.Input  required label='Description' placeholder='Description' onChange={this.handleChangeDescription} name="Description" placeholder='Description' width={6} />
                                            </Form.Group>
                                            <Button disabled={this.state.title.length < 1 ? true : false} type='submit'>Submit</Button>
                                        </Form>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </Accordion.Content>
                </Accordion>
      


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
