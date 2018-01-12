const router = require('express').Router()
const {Order, LineItem, Product, User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({
    include:[{model: LineItem, include: [{model: Product}]}]
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Order.findOne({
    where: {id: req.params.id},
    include: [{model: LineItem, include: [{model: Product}]}]
  })
  .then(order => res.json(order))
  .catch(next)
})

router.get('/:userId', (req, res, next) => {
  Order.fineOne({
    where: {
      userId: req.params.userId,
      status: 'created'
    }
  })
  .then(order => res.json(order))
  .catch(next)
})

router.put('/:orderId', function (req, res, next) {
  Order.update(req.body,
                {returning: true, where: {id: req.params.orderId}})
  .then(order => res.json(order))
  .catch(next);
});
