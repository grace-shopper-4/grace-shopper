/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './Main'
export {default as Home} from './Home'
export {default as Navbar} from './Navbar'
export {Login, Signup} from './AuthForm'
export {default as MyAccount} from './MyAccount'
export {default as OrderConfirmation} from './OrderConfirmation'
export {default as OrderReview} from './OrderReview'
export {default as Products} from './Products'
export {default as ShoppingCart} from './ShoppingCart'
export {default as SingleCategory} from './SingleCategory'
export {default as SingleProduct} from './SingleProduct'
export {default as AddToCartButton} from './AddToCartButton'
