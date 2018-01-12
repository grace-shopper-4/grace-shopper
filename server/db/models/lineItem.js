const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  itemPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  getterMethods: {
    totalPrice () {
        return this.quantity * this.itemPrice;
    }
  }
})


module.exports = LineItem
