const router = require('express').Router()
const { Product, Review } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll({
    include: [{ model: Review }]
  })
    .then(products => res.json(products))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Product.findOne({
    where: { id: req.params.id },
    include: [{ model: Review }]
  })
    .then(product =>
      res.json(product)
    )
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Review.destroy({
    where: {
      productId: req.params.id
    }
  }).then(bool =>
    Product.destroy({
      where: {
        id: req.params.id
      }
    }))
    .catch(next);
})

