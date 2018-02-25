const router = require('express').Router()
const Session = require('express').Session;
const {Order, LineItem, Product, User} = require('../db/models')
const {isAdmin, isUser, isSessionOrder} = require('../middleware.js')
module.exports = router


router.get('/', isAdmin, (req, res, next) => {
  Order.findAll({
    include:[{model: LineItem, include: [{model: Product}]}]
  })
    .then(orders => res.json(orders))
    .catch(next)
})


router.post('/', async (req, res, next) => {
  try {
    let userId = req.body.user.id;
    let isGuest = req.body.user.isGuest;
    let order;
    if (userId) {
      order = await Order.create({ userId, guestOrder: false })
    } else {
      order = await Order.create({ guestOrder: isGuest });
    }
    await LineItem.create({
        quantity: 1,
        itemPrice: req.body.product.price,
        productId: req.body.product.id,
        orderId: order.id
      })
    req.session.cartOrderId = order.id;
    req.session.userId = userId;
    req.session.isGuest = isGuest;
    console.log(req.session);
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
    let userId = req.session.userId;
    let isGuest = req.session.isGuest;
    console.log(req.session)
    let order;
    if (!isGuest){
      let orders = await Order.findAll({
        where: {userId, status: 'Created'},
        include: [{
          model: LineItem,
          include: [{
            model: Product
          }]
        }],
        order: [['createdAt', 'DESC']]
      })
      order = orders[0];
    } else {
      let orderId = req.session.cartOrderId;
      order = await Order.findOne({
        where: {id: orderId, guestOrder: true},
        include: [{
          model: LineItem,
          include: [{
            model: Product
          }]
        }]
      })
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
})

router.get('/users/:id', isUser, (req, res, next) => {
  Order.findAll({
    where: {userId: req.params.id},
    include:[{model: LineItem, include: [{model: Product}]}]
  })
    .then(orders => {
     res.json(orders)})
    .catch(next)
})


router.get('/:orderId', isAdmin, (req, res, next) => {
  Order.findOne({
    where: {id: req.params.orderId},
    include: [{model: LineItem, include: [{model: Product}]}]
  })
  .then(order => res.json(order))
  .catch(next)
})

router.put('/:orderId',  isSessionOrder, (req, res, next) => {
  Order.update(req.body,
                {returning: true, where: {id: req.params.orderId}})
  .then(order => {
    res.json(order)})
  .catch(next);
});

router.delete('/:orderId', isAdmin, async (req, res, next) => {
  let order = await Order.findById(req.params.id)
  order.destroy()
  let lineItems = await LineItem.findAll({where: {orderId: req.params.orderId}})
  Object.keys(lineItems).forEach(async lineItemKey => {
    await lineItems[lineItemKey].destroy();
  })
  res.status(200).send(`order ${req.params.id} deleted!`)
})

router.post('/:orderId/lineItem', isSessionOrder, async (req, res, next) => {
  try {
    const product = Product.findById(req.body.id)
    await LineItem.create({
      quantity: 1,
      itemPrice: product.price,
      productId: req.body.id,
      orderId: req.params.orderId
    })
    let updatedOrder = await Order.findOne({
      where: {id: req.params.orderId},
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

router.put('/:orderId/lineItem', isSessionOrder, async (req, res, next) => {
  try {
    let lineItem = await LineItem.findOne({
      where: {productId: req.body.product.id, orderId: req.params.orderId}
    })
    await lineItem.update({quantity: lineItem.quantity + req.body.numberToAdd});
    let updatedOrder = await Order.findOne({
      where: {id: req.params.orderId},
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


router.delete('/:orderId/lineItem/:lineItemId', isSessionOrder, async (req, res, next) => {
  try {
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


