import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products from './products'
import singleproduct from './singleProduct'
import categories from './categories'
import singleCategory from './singleCategory'
import cart from './cart'
import orders from './orders'

const reducer = combineReducers({user, products, singleproduct, categories, singleCategory, cart, orders})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './singleProduct'
export * from './categories'
export * from './singleCategory'
export * from './cart'
export * from './orders'

