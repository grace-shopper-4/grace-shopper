const router = require('express').Router()
const {Category, Product, Review} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next)
})


router.get('/:id', (req, res, next) => {
  Category.findOne({
    where: {id: req.params.id}
  })
    .then(category => res.json(category))
    .catch(next)
})
