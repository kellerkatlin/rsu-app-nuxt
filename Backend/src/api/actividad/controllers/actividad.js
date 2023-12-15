"use strict";

/**
 * actividad controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
   "api::actividad.actividad",
   ({ strapi }) => ({
      async getValidation(ctx) {
         const model = strapi.getModel("api::actividad.actividad");
         const definitions = model.attributes;

         
         const fullDefinitions = Object.keys(definitions).reduce((acc, key) => {
            acc[key] = definitions[key];
            return acc;
          }, {});

         ctx.body = fullDefinitions;
      },
   })
);
