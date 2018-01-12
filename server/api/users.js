const router = require('express').Router()
const {User, LineItem, Product, Order} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id/orders', (req, res, next) => {
  console.log('hit this route at least')
    Order.findAll({
      where: {userId: req.params.id},
      include: [{model: LineItem,
        include:[{model: Product}]
      }]
    })
    .then(userOrders => res.json(userOrders))
    .catch(next)
})

router.get('/:id', (req, res, next) => {

  User.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'email']
  })
    .then(user => {
      res.json(user)
    })
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

router.put('/:userId', (req, res, next) => {
  User.update(req.body,
                {returning: true, where: {id: req.params.userId}})
    .then(user => res.json(user))
    .catch(next)
})
