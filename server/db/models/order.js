const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: "Created",
    validate: {
      isIn: [["Completed", "Cancelled", "Processing", "Created"]]
    }
  },
  session: {
    type: Sequelize.STRING
  },
  guestOrder: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = Order
