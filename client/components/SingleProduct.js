import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, postReview, fetchReviews, fetchProduct, removedProduct, fetchProducts, updateProduct } from '../store'
import _ from 'lodash';
import StarsRating from 'react-stars-rating';
import { Image, Header, Accordion, Icon, Container, Item, Button, Grid, Form } from 'semantic-ui-react'
import history from "../history"
import AddToCartButton from './AddToCartButton'

export class SingleProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            editProductAccordionOpen: false
        }

        this.handleDelete = this.handleDelete.bind(this)
        this.handleTitle = this.handleTitle.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleInventory = this.handleInventory.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.toggleEditProduct = this.toggleEditProduct.bind(this);
        this.submitReview = this.submitReview.bind(this)
    }

    componentDidMount() {
        if (this.props.isAdmin) {
            this.props.fetchProducts()
        }
        this.props.fetchCategories()
        this.props.setCurrentProduct(this.props.id)


        this.props.getReviews()
    }

    handleDelete(e) {
        this.props.removedProduct(this.props.id)
        setTimeout(function () {
            history.push('/products')
        }, 10)
    }

    toggleEditProduct() {
        this.setState({ editProductAccordionOpen: !this.state.editProductAccordionOpen })
    }

    handleTitle(event) {

        this.setState({
            product: { ...this.state.product, title: event.target.value }
        })
    }
    handlePrice(event) {
        this.setState({
            product: { ...this.state.product, price: event.target.value }
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
    handleCategory(event) {
        this.setState({
            product: { ...this.state.product, categoryId: event.target.value }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const updatedProduct = this.state.product;
        this.props.updateProduct(this.props.id, updatedProduct)
        this.forceUpdate()
    }

    handleChange = (event) => {
        console.log(event.target.value)
    }

    submitReview = (event) => {
        event.preventDefault();
        let userId = this.props.userId
        const review = {
            title: event.target.title.value,
            content: event.target.content.value,
            stars: event.target.stars.value,
            productId: this.props.id,
            userId: userId
        };
        this.props.createReview(userId, review)
    }
    onRatingClick = (rating) => {
        return true
    }

    render() {
        let categoryId = this.props.product.categoryId
        let id = this.props.id
        let admin = this.props.isAdmin
        let currentProduct = {};
        this.props.categories.forEach(category => {
            category.products.forEach(product => {
                if (product.id === this.props.id) currentProduct = product;
            })
        })

        const { reviews } = this.props


        if (!reviews) return <div />
        if (Object.keys(currentProduct).length < 1) return <div />
        return (
            <div>
                {admin && (
                    <div>
                        <Accordion>
                            <Accordion.Title active={this.state.editProductAccordionOpen} onClick={this.toggleEditProduct}>
                                Edit Product
                                                <Icon name="dropdown" />
                            </Accordion.Title>
                            <Accordion.Content active={this.state.editProductAccordionOpen}>
                            <Container>
                            <Grid>
                                <Grid.Row left>
                                    <Grid.Column width={16}>
                                        <Form onSubmit={(event, result) => this.handleSubmit(event, result)}>
                                            <Form.Group>
                                                <Form.Input
                                                    label="Title" onChange={this.handleTitle} name="Title" placeholder='Title' width={3} />
                                                <Form.Input label='Description' placeholder='Tell us more about you...' onChange={this.handleDescription} name="Description" placeholder='Description' width={7} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Input label="Photo" onChange={this.handlePhoto} name="Photo" placeholder='Photo' width={4} />
                                                <Form.Input label="Price" onChange={this.handlePrice} name="Price" placeholder='Price' width={2} />
                                                <Form.Input label="Inventory" onChange={this.handleInventory} name="Inventory" placeholder='Inventory' width={2} />
                                                <Form.Input label='Size' onChange={this.handleSize} name="Size" placeholder='Size' width={2} />
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
                                            <Button type='submit'>Submit</Button>
                                            <Button onClick={this.handleDelete}> Delete Product </Button>
                                        </Form>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                            </Accordion.Content>
                        </Accordion>
                    </div>
                )}
                <Container className="singleProduct">
                    <Item.Group divided>
                        <Item>
                            <Item.Image src={this.props.product.photo} alt="product photo" />
                            <Item.Content>
                                <Item.Header as="h1"> {this.props.product.title}</Item.Header>
                                <Item.Description>{this.props.product.description}</Item.Description>
                                <Item.Meta>
                                    <span>Average Rating: </span><StarsRating rating={currentProduct.averageRating && currentProduct.averageRating} />
                                    <span> {`Average Rating: ${currentProduct.averageRating && currentProduct.averageRating}`} </span>
                                    <span> {`Based on ${currentProduct.numberOfReviews} reviews.`} </span>
                                </Item.Meta>
                                <Item.Extra> {`$${this.props.product.price / 100}`}</Item.Extra>
                                <AddToCartButton product={this.props.product} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Container>
                <div>
                    <h1>Reviews</h1>
                    {
                        reviews.filter(review => {
                            if (review.productId === currentProduct.id) {


                                return true
                            }
                        }).map(review => {
                            return (

                                    <Item.Group className="reviews" divided>
                                    <Item key={review.id}>
                                    <Item.Content>
                                    <div className="starsRating">
                                    <StarsRating rating={review.stars} />
                                    </div>
                                    <Item.Header as='h1'>{review.title}</Item.Header>
                                    <Item.Description>{review.content}</Item.Description>
                                    </Item.Content>
                                    </Item>
                                    </Item.Group>
                                    )
                        })
                    }
                    <div className="reviewForm" >
                    <h1>Add A Review</h1>
                    <Form onSubmit={this.submitReview}>
                    <Form.Group widths="equal">
                    <Form.Field>
                    <label>Review Title: </label>
                    <Form.Input onChange={this.handleChange} name="title" type="text" placeholder="review title" />
                    </Form.Field>
                    <Form.Field>
                    <label>Details: </label>
                    <Form.TextArea onChange={this.handleChange} name="content" type="text" placeholder="review content" />
                    </Form.Field>
                    <Form.Field>
                    <label>Star Rating</label>
                    <StarsRating insideForm={true} name="stars" rating={0} onClick={this.onRatingClick()} />
                    </Form.Field>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                    </Form>
                    </div>
                    </div>
                    </div>
                    )
}


}

const mapStateToProps = (state, ownProps) => {
    return {

        isAdmin: state.user.isAdmin,
        user: state.user,
        userId: state.user.id,
        id: parseInt(ownProps.match.params.id),
        categories: state.categories,
        products: state.products,
        product: state.singleproduct,
        reviews: state.reviews
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => {

        dispatch(fetchCategories())
    },
    getReviews: () => {
        dispatch(fetchReviews())
    },
    setCurrentProduct: (id) => {
        dispatch(fetchProduct(id))
    },
    createReview: (id, newReview) => {
        dispatch(postReview(id, newReview))
    },
    removedProduct: (id) => {
        dispatch(removedProduct(id))
    },
    fetchProducts: (id) => {
        dispatch(fetchProducts(id))
    },
    updateProduct: (id, updatedProduct) => {
        dispatch(updateProduct(id, updatedProduct))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

