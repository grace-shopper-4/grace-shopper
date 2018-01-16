module.exports = {
  isAdmin: function(req, res, next){
     let user = req.user
      if (user.isAdmin && user) {
        return next()
      } else {
        return next('you are not an admin')
      }
  },
  isUser: function(req, res, next){
    console.log('user params', req.params)
    let user = req.user
    if (user.id === +req.params.id || user.isAdmin){
      return next()
    } else {
      return next('you are not this user')
    }
  },
  isSessionOrder: function(req, res, next){
    // console.log("order params", typeof parseInt(req.params.orderId))
    let cartOrderId = req.session.cartOrderId
    console.log("sessionOrderReq", req.session)
    if (parseInt(req.params.orderId) === parseInt(cartOrderId)) {
      console.log("params", req.params.orderId, cartOrderId)
      return next()
    } else {
      console.log("else params", req.params.orderId, cartOrderId)
      return next('this is not your order')
    }
  }
}
