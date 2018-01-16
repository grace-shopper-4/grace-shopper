const router = require('express').Router()
const { Product, Review } = require('../db/models')
const {isAdmin, isUser, isSessionOrder} = require('../middleware.js')
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

router.put('/:id',  isAdmin, (req, res, next) => {
  Product.update(req.body,
                {returning: true, where: {id: req.params.id}})
  .then(product => {
    res.json(product)})
  .catch(next);
});

router.post('/', ( req, res, next) => {
  Product.create(req.body)
      .then((product) => {
          res.status(201).json(product);
      })
      .catch(next);
});

router.delete('/:id', isAdmin, (req, res, next) => {
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

