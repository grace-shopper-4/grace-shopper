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
                <Header as="h3">{currentCategory.title}</Header>
                    {currentCategory.products &&
                        currentCategory.products.map(product => {
                            return (
                                <Card key={product.id}>
                                    <NavLink to={`/products/${product.id}`}>
                                        <Image src={product.photo} />
                                        <Card.Content>
                                        <Card.Header className="categoryProductName">{product.title}</Card.Header>
                                        <Card.Header className="categoryProductName">{`Average Rating: ${product.averageRating && product.averageRating}`} </Card.Header>
                                        <Card.Header className="categoryProductName"> {`Based on ${product.numberOfReviews} reviews.`} </Card.Header>
                                        </Card.Content>
                                    </NavLink>
                                    <AddToCartButton product={product} />
                                </Card>
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
        fetchAllCategories: () => {
            dispatch(fetchCategories());
        }
    }
}


export default connect(mapState, mapDispatch)(SingleCategory)
