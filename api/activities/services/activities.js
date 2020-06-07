'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

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

     
};
