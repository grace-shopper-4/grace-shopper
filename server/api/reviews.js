const router = require('express').Router()
const {Review, User} = require('../db/models')
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

router.post('/', function (req, res, next) {
  Review.create(req.body)
  .then(review => res.json(review))
  .catch(next);
});
