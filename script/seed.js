/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const { Product, Category, User, LineItem, Order, Review } = require('../server/db/models')
const Chance = require('chance');
const chance = new Chance();
const axios = require('axios');

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  //seed User
  const users = await Promise.all([
    User.create({name: "Baloney", email: 'cody@email.com', password: '123'}),
    User.create({name: "Baloney", email: 'murphy@email.com', password: '123'})
  ])

  const titles = ['Party', 'Rain', 'Cowboy'];
  //seed Category
  for (let i = 0; i < 3; i++) {
    let title = titles[i];
    let description = chance.paragraph();
    await Category.create({
        title,
        description
    })
  }

  //seed Product
  for (let i = 0; i < 12; i++) {
    let title = chance.word({length: 5});
    let description = chance.paragraph();
    let price = parseFloat((chance.dollar({max: 100})).slice(1));
    let inventory = chance.integer({min: 1, max: 100});
    let size = Math.floor(Math.random() * (13) + 1);
    let categoryId = i%3 + 1;
    await Product.create({
        title,
        description,
        price,
        inventory,
        size,
        categoryId
    })
  }

  let statuses = ["Completed", "Cancelled", "Processing", "Created"]
  //seed Order
  for (let i = 0; i < 6; i++) {
    let status = statuses[Math.floor(Math.random() * 4)];
    let session = chance.word({length: 5})
    await Order.create({
        session,
        userId: 1
    })
  }

  //seed LineItem
  for (let i = 0; i < 12; i++) {
    let quantity = chance.integer({min: 1, max: 20})
    let orderId = Math.floor(Math.random() * (6) + 1);
    let productId = Math.floor(Math.random() * (12) + 1);
    let itemPrice = 0;
    await Product.findById(productId)
          .then(product => {
            itemPrice = product.price;
          })
          .catch(err => console.error(err))
    await LineItem.create({
        quantity,
        itemPrice,
        orderId,
        productId
    })
  }

  //seed Review
  for (let i = 0; i < 12; i++) {
    let title = chance.sentence();
    let content = chance.paragraph();
    let stars = Math.floor(Math.random() * (5) + 1);
    let productId = Math.floor(Math.random() * (12) + 1);
    let userId = Math.floor(Math.random() * (2) + 1);
    await Review.create({
        title,
        content,
        stars,
        productId,
        userId
    })
  }

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
