const Sequelize = require('sequelize')
const db = require('../db')

const nodemailer = require('nodemailer')
var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
      user: "graceshopper4@gmail.com",
      pass: "GSpassword1710"
  }
});

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: "Created",
    validate: {
      isIn: [["Completed", "Cancelled", "Processing", "Created"]]
    }
  },
  session: {
    type: Sequelize.STRING
  }
}, {
  hooks: {
    afterUpdate: async (order) => {
      const previousStatus = order.previousValues.status
      const status = order.status
      if (previousStatus === 'Created' && status === 'Processing') {
        const user = await order.getUser()
        var mailOptions = {
          to: user.email,
          subject: "Order # " + order.id,
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
      }
    }
  }
})

module.exports = Order
