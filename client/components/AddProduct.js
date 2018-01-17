import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../store'
import { Link } from 'react-router-dom';
import StarsRating from 'react-stars-rating';
import { Image, Header, Accordion, Icon, Container, Item, Button, Form, Grid } from 'semantic-ui-react'

export class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            addProductAccordionOpen: false
        }
        this.handleTitle = this.handleTitle.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleInventory = this.handleInventory.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSize = this.handleSize.bind(this);
        this.handleCategory = this.handleCategory.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleAddProduct = this.toggleAddProduct.bind(this);
    }



    handleTitle(event) {
        this.setState({
            product: { ...this.state.product, title: event.target.value }
        })
    }
    handlePrice(event) {
        this.setState({
            product: { ...this.state.product, price: event.target.value * 100 }
        })
    }
    handleInventory(event) {
        this.setState({
            product: { ...this.state.product, inventory: event.target.value }
        })
    }
    handlePhoto(event) {
        this.setState({
            product: { ...this.state.product, photo: event.target.value }
        })
    }
    handleDescription(event) {
        this.setState({
            product: { ...this.state.product, description: event.target.value }
        })
    }

    toggleAddProduct() {
        this.setState({ addProductAccordionOpen: !this.state.addProductAccordionOpen })
    }

    handleSize(event) {
        this.setState({
            product: { ...this.state.product, size: event.target.value }
        })
    }
    handleCategory(event) {
        this.setState({
            product: { ...this.state.product, categoryId: event.target.value }
        })
    }
    handleSubmit(event, result) {
        event.preventDefault();
        const createdProduct = this.state.product;
        event.target.Price.value = ''
        event.target.Title.value = ''
        event.target.Description.value = ''
        event.target.Inventory.value = ''
        event.target.Size.value = ''
        event.target.Photo.value = ''
        this.props.addProduct(createdProduct)
        this.forceUpdate()
    }

    render() {
        return (
            <div>

                <Accordion>
                    <Accordion.Title active={this.state.addProductAccordionOpen} onClick={this.toggleAddProduct}>
                        Add Product
                    <Icon name="dropdown" />
                    </Accordion.Title>
                    <Accordion.Content active={this.state.addProductAccordionOpen}>
                        <Container>
                            <Grid>
                                <Grid.Row left>
                                    <Grid.Column width={16}>
                                        <Form onSubmit={(event, result) => this.handleSubmit(event, result)}>
                                            <Form.Group>
                                                <Form.Input required
                                                    label="Title" onChange={this.handleTitle} name="Title" placeholder='Title' width={3} />
                                                <Form.Input r label='Description' placeholder='Tell us more about you...' onChange={this.handleDescription} name="Description" placeholder='Description' width={7} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Input label="Photo" onChange={this.handlePhoto} name="Photo" placeholder='Photo' width={4} />
                                                <Form.Input required label="Price" onChange={this.handlePrice} name="Price" placeholder='Price' width={2} />
                                                <Form.Input required label="Inventory" onChange={this.handleInventory} name="Inventory" placeholder='Inventory' width={2} />
                                                <Form.Input required label='Size' onChange={this.handleSize} name="Size" placeholder='Size' width={2} />
                                            </Form.Group>
                                            <Form.Group>
                                            </Form.Group>
                                            <div>
                                                <select name="Category" onChange={this.handleCategory}>
                                                    <option disabled selected>Choose Category</option>
                                                    {this.props.categories.map(category => {
                                                        return (
                                                            <option value={`${category.id}`} key={category.id}>
                                                                {category.title}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <Button disabled={Object.keys(this.state.product).length < 6 ? true : false} type='submit'>Submit</Button>
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

const mapStateToProps = (state, ownProps) => {
    return {
        isAdmin: state.user.isAdmin,
        categories: state.categories
    }
};

const mapDispatchToProps = (dispatch) => ({
    addProduct: (createdOrder) => {
        dispatch(createProduct(createdOrder))
    },


});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
