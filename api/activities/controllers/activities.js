"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");



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
    // Send an email to validate his subscriptions.
   
  },

  create: async(ctx) => {
    
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.activities.create(data, { files });
    } else {
      entity = await strapi.services.activities.create(ctx.request.body);
    }

    entity = sanitizeEntity(entity, { model: strapi.models.activities });

    strapi.services.activities.send(
      "test@test.com",
      "info@mallorcard.es",
      "Welcome",
      "Successfully Completed Task"
    );

    // Send response to the server.
    return entity;

  },
};
