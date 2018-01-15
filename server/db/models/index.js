const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const LineItem = require('./lineItem')
const Review = require('./review')
const Order = require('./order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Category.hasMany(Product);

Order.hasMany(LineItem);

Product.hasMany(Review);

User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Review);
Review.belongsTo(User)

Product.hasMany(LineItem)
LineItem.belongsTo(Product)

module.exports = {
  User,
  Product,
  Category,
  Review,
  LineItem,
  Order
}
