import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../store'
import { Link } from 'react-router-dom';
import StarsRating from 'react-stars-rating';


export class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {}
        }
        this.handleTitle = this.handleTitle.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleInventory = this.handleInventory.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSize = this.handleSize.bind(this);
        this.handleCategory = this.handleCategory.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);

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

    handleSize(event) {
        this.setState({
            product: { ...this.state.product, size: event.target.value }
        })
    }
    handleCategory(event) {
        this.setState({
            product: { ...this.state.product, categoryId: event.target.value}
        })
    }
    handleSubmit(event) {
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
                <h4> Add Product </h4>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div>
                        <input
                            type="text"
                            name="Title"
                            placeholder="Enter Title"
                            onChange={this.handleTitle}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="Price"
                            placeholder="Enter Price"
                            onChange={this.handlePrice}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="Inventory"
                            placeholder="Enter Inventory"
                            onChange={this.handleInventory}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="Photo"
                            placeholder="Enter Photo"
                            onChange={this.handlePhoto}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="Description"
                            placeholder="Enter Description"
                            onChange={this.handleDescription}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="Size"
                            placeholder="Enter Size"
                            onChange={this.handleSize}
                        />
                    </div>
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
                    <span>
                        <button type="submit">Submit</button>
                    </span>
                </form>
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
