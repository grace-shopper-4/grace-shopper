const router = require('express').Router()
const Session = require('express').Session;
const {Order, LineItem, Product, User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({
    include:[{model: LineItem, include: [{model: Product}]}, {model: User}]
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/cart', async (req, res, next) => {
  try {  
    let orderId = req.session.cartOrderId;
    let order = await Order.findOne({
      where: {id: orderId},
      include: [{
        model: LineItem, 
        include: [{
          model: Product
        }]
      }]
    })
    console.log(order);
    res.json(order);
  } catch (err) {
    next(err);
  }
})

router.get('/:id', (req, res, next) => {
  Order.findOne({
    where: {id: req.params.id},
    include:[{model: LineItem, include: [{model: Product}]}, {model: User}]
  })
  .then(order => res.json(order))
  .catch(next)
})


router.post('/:id/lineItem', async (req, res, next) => {
  try {
    await LineItem.create({
      quantity: 1,
      itemPrice: req.body.price,
      productId: req.body.id,
      orderId: req.params.id
    })
    let updatedOrder = await Order.findOne({
      where: {id: req.params.id}, 
      include: [{model: LineItem}]
    });
    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
})

router.put('/:id/lineItem', async (req, res, next) => {
  try {
    let lineItem = await LineItem.findOne({
      where: {productId: req.body.id, orderId: req.params.id}
    })
    lineItem.update({quantity: lineItem.quantity + 1});
    let updatedOrder = await Order.findOne({
      where: {id: req.params.id}, 
      include: [{model: LineItem}]
    });
    res.json(updatedOrder)
  } catch (err) {
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    let order = await Order.create()
    let lineItem = await LineItem.create({
        quantity: 1,
        itemPrice: req.body.price,
        productId: req.body.id,
        orderId: order.id
      })
    req.session.cartOrderId = order.id;
    let newOrder = await Order.findOne({
      where: {id: order.id},
      include: [{model: LineItem}]
    })
    res.json(newOrder);
    console.log(req.session);
  } catch (err) {
    next(err);
  }
})
