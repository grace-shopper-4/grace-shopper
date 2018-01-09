import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import allProducts from './allProducts'
import currentProduct from './currentProduct'
import categories from './categories'
import singleCategory from './singleCategory'
import cart from './cart'

const reducer = combineReducers({user, allProducts, currentProduct, categories, singleCategory, cart})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './allProducts'
export * from './currentProduct'
export * from './categories'
export * from './singleCategory'
export * from './cart'

