import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserOrders, fetchAllOrders, fetchAllUsers, removeUser, updateUser } from '../store'
import _ from 'lodash';
import AddProduct from './AddProduct';
import StarsRating from 'react-stars-rating';
import { Link } from 'react-router-dom'
import {Grid, Image, Header, Card, Button, List} from 'semantic-ui-react'

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
        if (this.props.user.isAdmin) {
            this.props.getAllUsers()
        }
    }

    render() {
       const adminUsers = this.props.adminUsers
       console.log(adminUsers.isAdmin)
        return (
            <div>
                <List className="userInfo">
                <List.Item>
                    <List.Icon name='users' />
                    <List.Content>Name: {this.props.user.name}</List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='mail' />
                    <List.Content>Email: {this.props.user.email}</List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='marker' />
                    <List.Content>Billing Address: {this.props.user.billingAddress}</List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='marker' />
                    <List.Content>Shipping Address: {this.props.user.shippingAddress}</List.Content>
                </List.Item>
                </List>
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

                <Grid className="adminUserGrid" columns={5} divided="vertically">
                    <Grid.Row>
                        <Grid.Column>Name</Grid.Column>
                        <Grid.Column>Email</Grid.Column>
                        <Grid.Column>Address</Grid.Column>
                        <Grid.Column>User Status</Grid.Column>
                        <Grid.Column>Remove User</Grid.Column>
                    </Grid.Row>

                {
                    adminUsers.map(user =>{
                        return(
                               <Grid.Row key={user.id}>
                                <Grid.Column>{user.name}</Grid.Column>
                                <Grid.Column>{user.email}</Grid.Column>
                                <Grid.Column>{user.shippingAddress}</Grid.Column>
                                <Grid.Column>
                                {user.isAdmin ? (
                                    <form>
                                        <Button onClick={() => {this.props.changeUserStatus(user.id, false)}}>Make User</Button>
                                    </form>
                                    ) : (
                                    <form>
                                        <Button onClick={() => {this.props.changeUserStatus(user.id, true)}}>Make Admin</Button>
                                    </form>
                                    )
                                }
                                </Grid.Column>
                                <Grid.Column><Button onClick={(event) => {this.props.deleteUser(user.id, event)}}>Delete User</Button></Grid.Column>
                               </Grid.Row>
                               )
                    })
                }
                </Grid>
                <AddProduct />
            </div>)

    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        adminUsers: state.adminUsers,
        orders: state.orders,
        order: state.cart,
        categories: state.categories
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleChange: () => {
        console.log(event.target.value)
    },
    fetchUserOrders: (id) => {
        dispatch(fetchUserOrders(id))
    },
    fetchAllOrders: () => {
        dispatch(fetchAllOrders())
    },
    getAllUsers: () => {
        dispatch(fetchAllUsers())
    },
    deleteUser: (userId, event) => {
      dispatch(removeUser(userId))
    },
    changeUserStatus: (userId, bool) => {
        event.preventDefault()
        const status = {
            isAdmin: bool
        }
        dispatch(updateUser(userId, status))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)
