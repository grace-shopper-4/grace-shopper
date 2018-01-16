const router = require('express').Router()
const {Review, User} = require('../db/models')
const {isAdmin, isUser, isSessionOrder} = require('../middleware.js')
module.exports = router

router.get('/', (req, res, next) => {
  Review.findAll({
    include:[{model: User}]
  })
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Review.findOne({
    where: {id: req.params.id},
    include:[{model: User}]
  })
  .then(review => res.json(review))
  .catch(next)
})

router.post('/:id', isUser, function (req, res, next) {
  console.log('req.body Review', req.body)
  Review.create(req.body)
  .then(review => res.json(review))
  .catch(next);
});
