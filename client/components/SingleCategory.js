import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchCategories } from '../store'
import { NavLink } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import { Image, Header, Card} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export class SingleCategory extends Component {

    componentDidMount() {
        this.props.fetchAllCategories();
    }

    render() {

        let currentCategory = {};
        this.props.categories.forEach(category => {
            if (category.id === parseInt(this.props.match.params.id)) currentCategory = category;
        })
        if (currentCategory === {}) return (<div />)
        return (
            <div>
                <Header as="h1">{currentCategory.title} Boots</Header>
                <Card.Group itemsPerRow={4}>
                    {currentCategory.products &&
                        currentCategory.products.map(product => {
                            return (
                                <Card key={product.id}>
                                    <NavLink to={`/products/${product.id}`}>
                                        <Image src={product.photo} />
                                        <Card.Content style={{marginBotton: '10px'}}>
                                        <Card.Header className="categoryProductName">{product.title}</Card.Header>
                                        <Card.Header className="categoryProductPrice">{`$ ${product.price / 100}`}</Card.Header>
                                        <Card.Header>{`Average Rating: ${product.averageRating && product.averageRating}`} </Card.Header>
                                        <Card.Header> {`Based on ${product.numberOfReviews} reviews.`} </Card.Header>
                                        </Card.Content>
                                    </NavLink>
                                <AddToCartButton product={product} />
                                </Card>
                            )
                    })}
                </Card.Group>
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
        fetchAllCategories: () => {
            dispatch(fetchCategories());
        }
    }
}


export default connect(mapState, mapDispatch)(SingleCategory)
