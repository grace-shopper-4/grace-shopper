const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: "Created"
    // validate: {
    //   isIn: ["Completed", "Cancelled", "Processing", "Created"]
    // }
  },
  session: {
    type: Sequelize.STRING
  }
})

module.exports = Order
