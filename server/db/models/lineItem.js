const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  itemPrice: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
},
{getterMethods: {
  totalPrice: () => this.itemPrice * this.quantity
}})

module.exports = LineItem
