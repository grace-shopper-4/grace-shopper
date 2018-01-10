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
    type: Sequelize.FLOAT,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: "../images/Oxhide_boots._Loulan,_Xinjiang._Early_Han_220_BCE_-_8_CE.jpg"
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Product

