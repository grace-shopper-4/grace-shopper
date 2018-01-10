/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './Main'
export {default as Home} from './Home'
export {Login, Signup} from './AuthForm'
export {MyAccount} from './MyAccount'
export {OrderConfirmation} from './OrderConfirmation'
export {OrderReview} from './OrderReview'
export {default as Products} from './Products'
export {ShoppingCart} from './ShoppingCart'
export {default as SingleCategory} from './SingleCategory'
export {SingleProduct} from './SingleProduct'
