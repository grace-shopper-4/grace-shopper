const router = require('express').Router()
const {User, LineItem, Product, Order} = require('../db/models')
const {isAdmin, isUser} = require('../middleware.js')
module.exports = router


router.get('/', isAdmin, (req, res, next) => {
  User.findAll({
    attributes: ['id', 'name', 'shippingAddress', 'isAdmin', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id/orders', isUser, async (req, res, next) => {  
  try {
    let userOrders = await Order.findAll({
      where: {userId: req.params.id},
      include: [{model: LineItem,
        include:[{model: Product}]
      }]
    })
    res.json(userOrders)
  } catch (err) {
    next(err);
  }
})

router.get('/:id', isUser, (req, res, next) => {
  User.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'email']
  })
  .then(user => {
    res.json(user)
  })
  .catch(next)
})


router.get('/:id/orders/:orderId', isUser, (req, res, next) => {
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
  // req.body === { isAdmin: true }
  // .update({
  //    keya: req.body.keya,
  //    beyb: req.body.keyb
  // })
  // _.pick(req.body, ['keya', 'keyb'])
  User.update(req.body,
                {returning: true, where: {id: req.params.userId}})
    .then(user => res.json(user))
    .catch(next)
})

router.delete('/:userId', isAdmin, function (req, res, next) {
  User.destroy({where: {id: req.params.userId}})
  .then(() => res.sendStatus(204))
  .catch(next);
})
