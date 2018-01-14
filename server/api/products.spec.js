/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const cowboyBoot = 'Cowboy Boot'
    const price = 90.90
    const inventory = 60
    const size = 8

    beforeEach(() => {
      return Product.create({
        title: cowboyBoot,
        price: price,
        inventory: inventory,
        size: size
      })
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal(cowboyBoot)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
