const router = require('express').Router()
const Session = require('express').Session;
const {Order, LineItem, Product, User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({
    include:[{model: LineItem, include: [{model: Product}]}]
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.post('/', async (req, res, next) => {
  try {
    let userId = req.body.user.id;
    let order;
    if (userId) {
      order = await Order.create({ userId })
    } else {
      order = await Order.create()
    }
    await LineItem.create({
        quantity: 1,
        itemPrice: req.body.product.price,
        productId: req.body.product.id,
        orderId: order.id
      })
    req.session.cartOrderId = order.id;
    let newOrder = await Order.findOne({
      where: {id: order.id},
      include: [{model: LineItem}]
    })
    res.json(newOrder);
  } catch (err) {
    next(err);
  }
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
    res.json(order);
  } catch (err) {
    next(err);
  }
})

router.get('/:id', (req, res, next) => {
  Order.findOne({
    where: {id: req.params.id},
    include: [{model: LineItem, include: [{model: Product}]}]
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

router.delete('/:id', async (req, res, next) => {
  let order = await Order.findById(req.params.id)
  order.destroy()
  let lineItems = await LineItem.findAll({where: {orderId: req.params.id}})
  Object.keys(lineItems).forEach(async lineItemKey => {
    await lineItems[lineItemKey].destroy();
  })
  res.status(200).send(`order ${req.params.id} deleted!`)
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
      include: [{
        model: LineItem, 
        include: [{
          model: Product
        }]
      }]
    });
    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
})

router.put('/:id/lineItem', async (req, res, next) => {
  try {
    let lineItem = await LineItem.findOne({
      where: {productId: req.body.product.id, orderId: req.params.id}
    })
    await lineItem.update({quantity: lineItem.quantity + req.body.numberToAdd});
    let updatedOrder = await Order.findOne({
      where: {id: req.params.id}, 
      include: [{
        model: LineItem, 
        include: [{
          model: Product
        }]
      }]
    });
    res.json(updatedOrder)
  } catch (err) {
    next(err);
  }
})


router.delete('/:orderId/lineItem/:lineItemId', async (req, res, next) => {
  try{
    let lineItem = await LineItem.findById(req.params.lineItemId)
    await lineItem.destroy();
    let updatedOrder = await Order.findOne({
      where: {id: req.params.orderId},
      include: [{
        model: LineItem, 
        include: [{
          model: Product
        }]
      }]
    })
    res.json(updatedOrder);
  } catch (err) {
    next(err)
  }
})


