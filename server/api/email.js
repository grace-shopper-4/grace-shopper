//api/email/send
const nodemailer = require('nodemailer')
const router = require('express').Router()
var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
      user: "graceshopper4@gmail.com",
      pass: "GSpassword1710"
  }
});

module.exports = router


router.post('/send', (req, res, next) => {
  var mailOptions = {
    to: req.body.user.email,
    subject: "Order # " + req.body.cart.id,
    text: "Thank you for your order! Here are the items you purchased: " + ""
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end("heres an error");
    } else {
      res.redirect('/orderconfirmation');
    }
  });
})
