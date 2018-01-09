const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.STRING,  //change back to DOUBLE
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: "imageURL"
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Product

