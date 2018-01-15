const router = require('express').Router()
const Session = require('express').Session;
const {Order, LineItem, Product, User} = require('../db/models')
module.exports = router


router.get('/send', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})
