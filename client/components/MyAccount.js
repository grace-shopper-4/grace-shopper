import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserOrders, fetchAllOrders } from '../store'
import _ from 'lodash';
import StarsRating from 'react-stars-rating';
import { Link } from 'react-router-dom'

export class MyAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: []
        }
        this.setOrdersByStatus = this.setOrdersByStatus.bind(this)
    }


    setOrdersByStatus(event) {
        console.log("inside", this.props)
        const filter = event.target.value
        const orders = this.props.orders
        let ordersToSet = filter !== 'none' ?
            orders.filter(order => order.status === filter) :
            orders
        this.setState({ orders: ordersToSet })


    }
    componentDidMount() {
        if (this.props.user.isAdmin) {
            this.props.fetchAllOrders()
        }
        else {
            this.props.fetchUserOrders(this.props.user.id)
        }
    }

    render() {
        return (
            <div>
                <h1> {this.props.user.email}</h1>
                <h1> {this.props.user.name}</h1>
                <h1> Billing Address: {this.props.user.billingAddress}</h1>
                <h1> Shipping Address: {this.props.user.shippingAddress}</h1>
                <select className="form-control" name="filter-orders" onChange={this.setOrdersByStatus}>
                    <option value="none">View Your Orders</option>
                    <option>Created</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                    <option>Processing</option>
                </select>
                <ul>
                    {this.state.orders.map(order => {
                        let totalPrice = 0
                        return (
                            <div key={order.id}>
                                <Link to={`/orders/${order.id}`}>
                                    Order# {order.id}
                                </Link>

                            </div>)
                    })}
                </ul>
            </div>)

    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        orders: state.orders,
        order: state.cart,
        categories: state.categories
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchUserOrders: (id) => {
        dispatch(fetchUserOrders(id))
    },
    fetchAllOrders: () => {
        dispatch(fetchAllOrders())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)

