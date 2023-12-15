'use strict';

/**
 * actividad router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/custom',
      handler: 'actividad.getValidation',
      config: {
        auth: false
      },
    },
  ],
};