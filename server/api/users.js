const router = require('express').Router()
const {User, LineItem, Product} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'email']
  })
    .then(user => res.json(user))
    .catch(next)
})


router.get('/:id/orders', (req, res, next) => {
  User.findOne({
    where: {id: req.params.id},
    include:[{model: Order,
      include: [{model: LineItem,
        include:[{model: Product}]}]}]
  })
    .then(userOrders => res.json(userOrders))
    .catch(next)
})


router.get('/:id/orders/:orderId', (req, res, next) => {
  User.findOne({
    where: {id: req.params.id},
    include:[{model: Order, where:{id: req.params.orderId},
      include: [{model: LineItem,
        include:[{model: Product}]}]}]
  })
    .then(userOrder => res.json(userOrder))
    .catch(next)
})
