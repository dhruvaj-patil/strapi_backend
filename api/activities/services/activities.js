'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */
const nodemailer = require("nodemailer");




 // Create reusable transporter object using SMTP transport.
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'yadira.rowe20@ethereal.email', // generated ethereal user
    pass: '7bw3jX7cb2gsJwmkAQ', // generated ethereal password
  },
});





module.exports = {

        updateDiscount: async (discountPercent, allActivities) => {
            let updatedPrice;
            let id;
          
            return Promise.all(
                allActivities.map((activity) => {
                 
              updatedPrice = activity.price - activity.price * discountPercent;
              id = activity.id;
              return strapi.services.activities.update({id: id}, {
                  price: updatedPrice,
                });
            })

            
          );

        },

        send: (from, to, subject, text) => {
          // Setup e-mail data.
          const options = {
            from,
            to,
            subject,
            text,
          };
      
          // Return a promise of the function that sends the email.
          return transporter.sendMail(options);
        },
     
};
