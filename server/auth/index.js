const router = require('express').Router()
const Session = require('express-session')
const User = require('../db/models/user')
const Order = require('../db/models/order')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}, include: [{model: Order}]})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.session.userId = user.id;
        req.session.isGuest = false;
        req.login(user, err => (err ? next(err) : res.json(user)))
        return user.id;
      }
    })
    .then(userId => {  // if there is a guest cart, set the cart's userId to the newly logged in user. guest no longer has access.
      if (req.session.cartOrderId) {
        Order.findById(req.session.cartOrderId)
        .then(order => order.setUser(userId));
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy();
  res.redirect('/home')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
