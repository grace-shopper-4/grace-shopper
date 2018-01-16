const router = require('express').Router()
const {Category, Product, Review} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  console.log(req.session);
  Category.findAll({
    include: [{model: Product, include: [{model: Review}]}]
  })
    .then(categories => res.json(categories))
    .catch(next)
})


router.get('/:id', (req, res, next) => {
  Category.findOne({
    where: {id: req.params.id},
    include: [{model: Product, include: [{model: Review}]}]
  })
    .then(category => res.json(category))
    .catch(next)
})


router.post('/', (req, res, next) =>{
  Category.create(req.body)
  .then((createdCategory) => res.json(createdCategory))
  .catch(next)
})
