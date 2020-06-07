"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

const nodemailer = require("nodemailer");

const GITHUBURL = "";


module.exports = {

  priceUpdate: async (ctx) => {
    let allActivities;
   
    // Check for discount value between 1-100
    if (!/^[1-9][0-9]?$|^100$/.test(ctx.request.body.discount)) {
      return ctx.response.badData(
        `Discount value ${ctx.request.body.discount} is invalid`,
        "Discount Value is invalid, should be between 1-100"
      );
    }

    try {
      // Get All Records
      allActivities = await strapi.services.activities.find();

      let discountPercent = ctx.request.body.discount / 100;
      // Update Each Entry in DB
      updatedEntries = await strapi.services.activities.updateDiscount(
        discountPercent,
        allActivities
      );
    } catch (err) {
      console.log("Error:", err);
      return err;
    }

    ctx.response.status = 200;
    ctx.response.body = "Activities have been updated";

    return ctx.response;
  },

  sendEmail: async (ctx) => {
    let htmlMessageText = `I have uploaded my project on GITHUB URL:${GITHUBURL}`
    
      // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
     // true for 465, false for other ports
    auth: {
      user: 'bailey.brakus43@ethereal.email', // generated ethereal user
      pass: 'tsG7hZB9SENZWayGVf', // generated ethereal password
    },
    tls: {
      reject
    }
  });

 
  // send mail with defined transport object
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"bailey.brakus43@ethereal.email" <foo@example.com>', // sender address
    to: "dhruvaj.patil@example.com", // list of receivers ,baz@example.com
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });


  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


    return ("Recorded mail info =>" + info.messageId);
  },
};
